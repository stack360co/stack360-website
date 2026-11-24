'use client';

import { Check, Copy, Loader2, MessageCircle, RotateCcw, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { EASE_OUT_EXPO } from '@/components/shared/motion/variants';
import ScrollToTopButton from '@/components/shared/ScrollToTopButton';
import {
  ASSISTANT_META,
  ASSISTANT_PROJECT_CATEGORIES,
  ASSISTANT_PROJECTS,
  ASSISTANT_QUICK_ACTIONS,
  ASSISTANT_REPLIES,
  ASSISTANT_SERVICE_CATEGORIES,
  ASSISTANT_SERVICES,
  ASSISTANT_WHO_WE_ARE,
  type AssistantQuickActionId,
} from '@/constants/component/assistant-data';
import { CONTACT_CHANNELS } from '@/constants/component/contact-data';
import { SITE_EMAIL, SITE_EMAIL_HREF } from '@/constants/site';
import { cn } from '@/styles/tailwind.utils';
import { copyToClipboard } from '@/utils/clipboard';

type MessageRole = 'assistant' | 'user';

type MessageKind =
  | 'text'
  | 'actions'
  | 'contact'
  | 'project-categories'
  | 'project-results'
  | 'project-continue'
  | 'service-categories'
  | 'service-results'
  | 'service-continue'
  | 'work-with-us'
  | 'who-we-are';

interface ChatMessage {
  id: string;
  role: MessageRole;
  kind: MessageKind;
  text?: string;
  categoryId?: string;
  excludeIds?: string[];
  stamp?: string;
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function delay(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const timer = window.setTimeout(() => resolve(), ms);
    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      },
      { once: true }
    );
  });
}

function BrandMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-50',
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/favicon.svg"
        alt=""
        fill
        sizes={`${size}px`}
        className="object-contain p-[18%]"
      />
    </span>
  );
}

function CopyableRow({
  label,
  value,
  href,
  copyValue,
}: {
  label: string;
  value: string;
  href?: string;
  copyValue?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [copying, setCopying] = useState(false);

  const onCopy = async () => {
    setCopying(true);
    const ok = await copyToClipboard(copyValue ?? value);
    setCopying(false);
    if (!ok) {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="group flex items-start justify-between gap-sm rounded-md border border-neutral-200 bg-neutral-50 px-sm py-sm transition-colors hover:border-primary/30">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-500">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="mt-0.5 block truncate text-sm font-semibold text-primary hover:text-primary-dark"
          >
            {value}
          </a>
        ) : (
          <p className="mt-0.5 text-sm font-medium leading-snug text-neutral-800">{value}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onCopy}
        disabled={copying}
        aria-label={`Copy ${label}`}
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border transition-colors',
          copied
            ? 'border-success/40 bg-success/10 text-success'
            : 'border-neutral-200 bg-white text-neutral-500 hover:border-primary/40 hover:text-primary'
        )}
      >
        {copying ? (
          <Loader2 size={14} className="animate-spin" />
        ) : copied ? (
          <Check size={14} />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-sm">
      <BrandMark size={28} />
      <div className="rounded-xl rounded-bl-sm border border-neutral-200 bg-white px-md py-sm">
        <div className="flex items-center gap-sm">
          <Loader2 size={14} className="animate-spin text-primary" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            {ASSISTANT_META.typingLabel}
          </span>
        </div>
        <span className="sr-only">{ASSISTANT_META.typingLabel}</span>
      </div>
    </div>
  );
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'greet',
    role: 'assistant',
    kind: 'text',
    text: ASSISTANT_META.greeting,
    stamp: 'just now',
  },
  { id: 'actions', role: 'assistant', kind: 'actions' },
];

export default function ChatAssistant() {
  const reduced = useReducedMotion();
  const router = useRouter();
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [visitedProjects, setVisitedProjects] = useState<string[]>([]);
  const [visitedServices, setVisitedServices] = useState<string[]>([]);
  const [showWhatsAppOptions, setShowWhatsAppOptions] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);

  const whatsappChannels = CONTACT_CHANNELS.filter(
    (channel): channel is Extract<(typeof CONTACT_CHANNELS)[number], { href: string }> =>
      channel.label.toLowerCase().includes('whatsapp') && 'href' in channel
  );

  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (!el) {
      return;
    }
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [reduced]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when transcript grows
  useEffect(() => {
    scrollToEnd();
  }, [messages, typing, scrollToEnd]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const streamMessages = useCallback(
    async (next: ChatMessage[]) => {
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      setBusy(true);

      const stream = async (index: number): Promise<void> => {
        if (index >= next.length) {
          return;
        }

        setTyping(true);

        await delay(reduced ? 80 : 520 + Math.floor(Math.random() * 380), controller.signal);

        setTyping(false);
        setMessages((prev) => [...prev, next[index]]);

        await delay(reduced ? 40 : 140, controller.signal);

        return stream(index + 1);
      };

      try {
        await stream(0);
      } catch {
        setTyping(false);
      } finally {
        setBusy(false);
        setPendingAction(null);
      }
    },
    [reduced]
  );

  const requestReset = () => {
    if (busy || resetting) {
      return;
    }
    setConfirmReset(true);
  };

  const cancelReset = () => {
    if (resetting) {
      return;
    }
    setConfirmReset(false);
  };

  const confirmResetChat = async () => {
    if (busy || resetting) {
      return;
    }

    setResetting(true);
    abortRef.current?.abort();
    setTyping(false);
    setPendingAction(null);

    try {
      await delay(reduced ? 120 : 650);
      setVisitedProjects([]);
      setVisitedServices([]);
      setMessages([
        {
          id: uid('greet'),
          role: 'assistant',
          kind: 'text',
          text: ASSISTANT_META.greeting,
          stamp: 'just now',
        },
        { id: uid('actions'), role: 'assistant', kind: 'actions' },
      ]);
      setConfirmReset(false);
    } finally {
      setResetting(false);
      setBusy(false);
    }
  };

  const openMainMenu = async () => {
    if (busy) {
      return;
    }
    setPendingAction('main-menu');
    setMessages((prev) => [
      ...prev.filter(
        (m) =>
          m.kind !== 'actions' && m.kind !== 'project-continue' && m.kind !== 'service-continue'
      ),
      { id: uid('user'), role: 'user', kind: 'text', text: 'Main menu' },
    ]);
    await streamMessages([
      {
        id: uid('a'),
        role: 'assistant',
        kind: 'text',
        text: ASSISTANT_REPLIES.followUp,
      },
      { id: uid('act'), role: 'assistant', kind: 'actions' },
    ]);
  };

  const handleQuickAction = async (id: AssistantQuickActionId, label: string) => {
    if (busy) {
      return;
    }

    setPendingAction(id);
    setMessages((prev) => [
      ...prev.filter((m) => m.kind !== 'actions'),
      { id: uid('user'), role: 'user', kind: 'text', text: label },
    ]);

    if (id === 'contact') {
      await streamMessages([
        {
          id: uid('a'),
          role: 'assistant',
          kind: 'text',
          text: ASSISTANT_REPLIES.contactIntro,
        },
        { id: uid('c'), role: 'assistant', kind: 'contact' },
        {
          id: uid('f'),
          role: 'assistant',
          kind: 'text',
          text: ASSISTANT_REPLIES.followUp,
        },
        { id: uid('act'), role: 'assistant', kind: 'actions' },
      ]);
      return;
    }

    if (id === 'our-work') {
      setVisitedProjects([]);
      await streamMessages([
        {
          id: uid('a'),
          role: 'assistant',
          kind: 'text',
          text: ASSISTANT_REPLIES.ourWorkIntro,
        },
        { id: uid('pc'), role: 'assistant', kind: 'project-categories' },
      ]);
      return;
    }

    if (id === 'what-we-build') {
      setVisitedServices([]);
      await streamMessages([
        {
          id: uid('a'),
          role: 'assistant',
          kind: 'text',
          text: ASSISTANT_REPLIES.whatWeBuildIntro,
        },
        { id: uid('sc'), role: 'assistant', kind: 'service-categories' },
      ]);
      return;
    }

    if (id === 'who-we-are') {
      await streamMessages([
        {
          id: uid('a'),
          role: 'assistant',
          kind: 'text',
          text: ASSISTANT_REPLIES.whoWeAreIntro,
        },
        { id: uid('w'), role: 'assistant', kind: 'who-we-are' },
        {
          id: uid('f'),
          role: 'assistant',
          kind: 'text',
          text: ASSISTANT_REPLIES.followUp,
        },
        { id: uid('act'), role: 'assistant', kind: 'actions' },
      ]);
      return;
    }

    await streamMessages([
      {
        id: uid('a'),
        role: 'assistant',
        kind: 'text',
        text: ASSISTANT_REPLIES.workWithUsIntro,
      },
      { id: uid('p'), role: 'assistant', kind: 'work-with-us' },
      {
        id: uid('f'),
        role: 'assistant',
        kind: 'text',
        text: ASSISTANT_REPLIES.followUp,
      },
      { id: uid('act'), role: 'assistant', kind: 'actions' },
    ]);
  };

  const handleProjectCategory = async (categoryId: string, label: string) => {
    if (busy) {
      return;
    }
    setPendingAction(`project-${categoryId}`);
    const nextVisited = visitedProjects.includes(categoryId)
      ? visitedProjects
      : [...visitedProjects, categoryId];
    setVisitedProjects(nextVisited);

    setMessages((prev) => [
      ...prev.filter((m) => m.kind !== 'project-continue' && m.kind !== 'project-categories'),
      { id: uid('user'), role: 'user', kind: 'text', text: label },
    ]);

    const remaining = ASSISTANT_PROJECT_CATEGORIES.filter((c) => !nextVisited.includes(c.id));

    await streamMessages([
      {
        id: uid('a'),
        role: 'assistant',
        kind: 'text',
        text: ASSISTANT_REPLIES.loadingProject,
      },
      {
        id: uid('pr'),
        role: 'assistant',
        kind: 'project-results',
        categoryId,
      },
      {
        id: uid('f'),
        role: 'assistant',
        kind: 'text',
        text:
          remaining.length > 0 ? ASSISTANT_REPLIES.moreProjects : ASSISTANT_REPLIES.allProjectsSeen,
      },
      {
        id: uid('pc'),
        role: 'assistant',
        kind: 'project-continue',
        excludeIds: nextVisited,
      },
    ]);
  };

  const handleServiceCategory = async (categoryId: string, label: string) => {
    if (busy) {
      return;
    }
    setPendingAction(`service-${categoryId}`);
    const nextVisited = visitedServices.includes(categoryId)
      ? visitedServices
      : [...visitedServices, categoryId];
    setVisitedServices(nextVisited);

    setMessages((prev) => [
      ...prev.filter((m) => m.kind !== 'service-continue' && m.kind !== 'service-categories'),
      { id: uid('user'), role: 'user', kind: 'text', text: label },
    ]);

    const remaining = ASSISTANT_SERVICE_CATEGORIES.filter((c) => !nextVisited.includes(c.id));

    await streamMessages([
      {
        id: uid('a'),
        role: 'assistant',
        kind: 'text',
        text: ASSISTANT_REPLIES.loadingService,
      },
      {
        id: uid('sr'),
        role: 'assistant',
        kind: 'service-results',
        categoryId,
      },
      {
        id: uid('f'),
        role: 'assistant',
        kind: 'text',
        text:
          remaining.length > 0 ? ASSISTANT_REPLIES.moreServices : ASSISTANT_REPLIES.allServicesSeen,
      },
      {
        id: uid('sc'),
        role: 'assistant',
        kind: 'service-continue',
        excludeIds: nextVisited,
      },
    ]);
  };

  const actionButtons = [
    ...ASSISTANT_QUICK_ACTIONS,
    { id: 'who-we-are' as const, label: 'Who We Are', span: 'full' as const },
  ];

  return (
    <div className="pointer-events-none flex flex-col items-end gap-md">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label={ASSISTANT_META.name}
            aria-modal="false"
            aria-busy={busy}
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            className="pointer-events-auto flex h-[min(34rem,calc(100vh-7.5rem))] w-[min(22.5rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-card"
          >
            <header className="flex items-center justify-between gap-sm bg-primary px-md py-sm text-neutral-50">
              <div className="flex min-w-0 items-center gap-sm">
                <BrandMark size={32} className="border border-white/30" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold tracking-tight">{ASSISTANT_META.name}</p>
                  <p className="truncate font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-50/90">
                    {busy ? ASSISTANT_META.typingLabel : ASSISTANT_META.tagline}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-xs">
                <button
                  type="button"
                  onClick={requestReset}
                  disabled={busy || resetting}
                  aria-label="Reset conversation"
                  aria-expanded={confirmReset}
                  className="flex h-11 w-11 items-center justify-center rounded-sm text-neutral-50 transition-colors hover:bg-white/10 disabled:opacity-50"
                >
                  {resetting ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <RotateCcw size={15} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (resetting) {
                      return;
                    }
                    setConfirmReset(false);
                    setOpen(false);
                  }}
                  disabled={resetting}
                  aria-label="Close guide"
                  className="flex h-11 w-11 items-center justify-center rounded-sm text-neutral-50 transition-colors hover:bg-white/10 disabled:opacity-50"
                >
                  <X size={16} />
                </button>
              </div>
            </header>

            <AnimatePresence>
              {confirmReset && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={reduced ? undefined : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                  className="overflow-hidden border-b border-primary-dark/30 bg-primary-dark"
                >
                  <div className="flex items-center justify-between gap-sm px-md py-sm">
                    <p className="min-w-0 text-xs font-medium leading-snug text-neutral-50">
                      {resetting ? 'Clearing this chat…' : 'Clear this chat and start over?'}
                    </p>
                    <div className="flex shrink-0 items-center gap-xs">
                      <button
                        type="button"
                        onClick={cancelReset}
                        disabled={resetting}
                        className="rounded-sm border border-white/25 px-sm py-1 text-[11px] font-bold text-neutral-50 transition-colors hover:bg-white/10 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={confirmResetChat}
                        disabled={resetting}
                        className="inline-flex items-center gap-xs rounded-sm bg-neutral-50 px-sm py-1 text-[11px] font-bold text-primary transition-colors hover:bg-white disabled:opacity-70"
                      >
                        {resetting && <Loader2 size={12} className="animate-spin" />}
                        {resetting ? 'Resetting…' : 'Reset'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              ref={listRef}
              className={cn(
                'flex-1 overflow-y-auto bg-neutral-100 px-md py-md',
                (busy || resetting) && 'select-none'
              )}
            >
              <div
                className={cn(
                  'space-y-lg',
                  (busy || resetting) && 'pointer-events-none opacity-70'
                )}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-sm',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && <BrandMark size={28} />}

                    <div
                      className={cn(
                        'max-w-[85%] space-y-sm',
                        message.role === 'user' && 'items-end'
                      )}
                    >
                      {message.kind === 'text' && message.text && (
                        <div
                          className={cn(
                            'rounded-xl px-sm py-sm text-sm leading-relaxed',
                            message.role === 'user'
                              ? 'rounded-br-sm bg-primary text-neutral-50'
                              : 'rounded-bl-sm border border-neutral-200 bg-white text-neutral-800'
                          )}
                        >
                          {message.text}
                        </div>
                      )}

                      {message.kind === 'actions' && (
                        <div className="grid grid-cols-2 gap-sm">
                          {actionButtons.map((action) => {
                            const loading = pendingAction === action.id;
                            return (
                              <button
                                key={action.id}
                                type="button"
                                disabled={busy}
                                onClick={() => handleQuickAction(action.id, action.label)}
                                className={cn(
                                  'inline-flex items-center justify-start gap-xs rounded-lg border border-neutral-200 bg-white px-sm py-sm text-left text-xs font-semibold leading-snug text-neutral-800 transition-colors hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-50',
                                  action.span === 'full' ? 'col-span-2' : 'col-span-1'
                                )}
                              >
                                {loading && (
                                  <Loader2
                                    size={12}
                                    className="shrink-0 animate-spin text-primary"
                                  />
                                )}
                                {action.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {message.kind === 'contact' && (
                        <div className="space-y-sm rounded-xl border border-neutral-200 bg-white p-sm">
                          <button
                            type="button"
                            onClick={() => {
                              setPendingAction('contact-inquiry');
                              router.push('/contact?source=chat-assistant&redirect=redirecting');
                            }}
                            disabled={busy}
                            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-sm py-sm text-xs font-bold text-neutral-50 transition-colors hover:bg-primary-dark disabled:pointer-events-none disabled:opacity-60"
                          >
                            Send inquiry
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowWhatsAppOptions((prev) => !prev)}
                            disabled={busy}
                            className="inline-flex w-full items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 px-sm py-sm text-xs font-bold text-neutral-800 transition-colors hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-60"
                          >
                            Send WhatsApp message
                          </button>

                          {showWhatsAppOptions && (
                            <div className="space-y-xs">
                              {whatsappChannels.map((channel) => (
                                <button
                                  key={channel.label}
                                  type="button"
                                  onClick={() => {
                                    window.open(channel.href, '_blank', 'noopener,noreferrer');
                                  }}
                                  className="inline-flex w-full items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 px-sm py-sm text-left text-xs font-semibold text-neutral-800 transition-colors hover:border-primary/40 hover:text-primary"
                                >
                                  <span>{channel.label}</span>
                                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                                    Open
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {(message.kind === 'project-categories' ||
                        message.kind === 'project-continue') && (
                        <div className="space-y-sm">
                          <div className="flex flex-wrap gap-sm">
                            {ASSISTANT_PROJECT_CATEGORIES.filter(
                              (cat) => !(message.excludeIds ?? []).includes(cat.id)
                            ).map((cat) => {
                              const loading = pendingAction === `project-${cat.id}`;
                              return (
                                <button
                                  key={cat.id}
                                  type="button"
                                  disabled={busy}
                                  onClick={() => handleProjectCategory(cat.id, cat.label)}
                                  className="inline-flex items-center gap-xs rounded-md border border-neutral-200 bg-white px-sm py-1.5 text-xs font-bold text-neutral-800 transition-colors hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                                >
                                  {loading && (
                                    <Loader2 size={12} className="animate-spin text-primary" />
                                  )}
                                  {cat.label}
                                </button>
                              );
                            })}
                          </div>
                          {message.kind === 'project-continue' && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={openMainMenu}
                              className="inline-flex items-center gap-xs rounded-md border border-primary/30 bg-primary/5 px-sm py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-50"
                            >
                              {pendingAction === 'main-menu' && (
                                <Loader2 size={12} className="animate-spin" />
                              )}
                              Main menu
                            </button>
                          )}
                        </div>
                      )}

                      {message.kind === 'project-results' && message.categoryId && (
                        <div className="space-y-sm">
                          {(ASSISTANT_PROJECTS[message.categoryId] ?? []).map((project) => (
                            <div
                              key={project.name}
                              className="rounded-xl border border-neutral-200 bg-white p-sm"
                            >
                              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                                {project.metric}
                              </p>
                              <p className="mt-xs text-sm font-bold text-neutral-900">
                                {project.name}
                              </p>
                              <p className="mt-xs text-xs leading-relaxed text-neutral-500">
                                {project.summary}
                              </p>
                              <Link
                                href={project.href}
                                className="mt-sm inline-flex text-xs font-bold text-primary hover:text-primary-dark"
                              >
                                Open Our Work →
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}

                      {(message.kind === 'service-categories' ||
                        message.kind === 'service-continue') && (
                        <div className="space-y-sm">
                          <div className="flex flex-wrap gap-sm">
                            {ASSISTANT_SERVICE_CATEGORIES.filter(
                              (cat) => !(message.excludeIds ?? []).includes(cat.id)
                            ).map((cat) => {
                              const loading = pendingAction === `service-${cat.id}`;
                              return (
                                <button
                                  key={cat.id}
                                  type="button"
                                  disabled={busy}
                                  onClick={() => handleServiceCategory(cat.id, cat.label)}
                                  className="inline-flex items-center gap-xs rounded-md border border-neutral-200 bg-white px-sm py-1.5 text-xs font-bold text-neutral-800 transition-colors hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                                >
                                  {loading && (
                                    <Loader2 size={12} className="animate-spin text-primary" />
                                  )}
                                  {cat.label}
                                </button>
                              );
                            })}
                          </div>
                          {message.kind === 'service-continue' && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={openMainMenu}
                              className="inline-flex items-center gap-xs rounded-md border border-primary/30 bg-primary/5 px-sm py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-50"
                            >
                              {pendingAction === 'main-menu' && (
                                <Loader2 size={12} className="animate-spin" />
                              )}
                              Main menu
                            </button>
                          )}
                        </div>
                      )}

                      {message.kind === 'service-results' && message.categoryId && (
                        <div className="space-y-sm">
                          {(ASSISTANT_SERVICES[message.categoryId] ?? []).map((service) => (
                            <div
                              key={service.title}
                              className="rounded-xl border border-neutral-200 bg-white p-sm"
                            >
                              <p className="text-sm font-bold text-neutral-900">{service.title}</p>
                              <p className="mt-xs text-xs leading-relaxed text-neutral-500">
                                {service.summary}
                              </p>
                              <p className="mt-sm font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                                {service.stack}
                              </p>
                              <Link
                                href={service.href}
                                className="mt-sm inline-flex text-xs font-bold text-primary hover:text-primary-dark"
                              >
                                Open What We Build →
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}

                      {message.kind === 'who-we-are' && (
                        <div className="space-y-sm rounded-xl border border-neutral-200 bg-white p-sm">
                          <div className="flex flex-wrap gap-sm">
                            {ASSISTANT_WHO_WE_ARE.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-md border border-neutral-200 bg-neutral-50 px-sm py-1.5 text-xs font-bold text-neutral-800 transition-colors hover:border-primary/40 hover:text-primary"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {message.kind === 'work-with-us' && (
                        <div className="space-y-sm rounded-xl border border-neutral-200 bg-white p-sm">
                          <p className="text-xs leading-relaxed text-neutral-600">
                            {ASSISTANT_REPLIES.workWithUsCta}
                          </p>
                          <div className="flex flex-wrap gap-sm">
                            <Link
                              href="/work-with-us/software-partner"
                              className="inline-flex rounded-sm bg-primary px-md py-sm text-xs font-bold text-neutral-50 transition-colors hover:bg-primary-dark"
                            >
                              Work With Us
                            </Link>
                          </div>
                          <CopyableRow
                            label="Sales email"
                            value={SITE_EMAIL}
                            href={SITE_EMAIL_HREF}
                            copyValue={SITE_EMAIL}
                          />
                        </div>
                      )}

                      {message.stamp && (
                        <p className="font-mono text-[9px] text-neutral-400">
                          {ASSISTANT_META.name} · {message.stamp}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {typing && <TypingIndicator />}
              </div>
            </div>

            <footer className="border-t border-neutral-200 bg-white px-md py-sm">
              <p className="text-center font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                {busy ? ASSISTANT_META.typingLabel : ASSISTANT_META.footer}
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-md">
        <ScrollToTopButton />

        <motion.button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? 'Close Stack360 Guide' : 'Open Stack360 Guide'}
          onClick={() => setOpen((v) => !v)}
          whileHover={reduced ? undefined : { scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-primary text-neutral-50 shadow-card transition-colors hover:bg-primary-dark"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={reduced ? false : { opacity: 0, rotate: -40 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={reduced ? undefined : { opacity: 0, rotate: 40 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} strokeWidth={2.25} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="relative flex h-7 w-7 items-center justify-center overflow-hidden"
              >
                <Image
                  src="/icon.svg"
                  alt=""
                  fill
                  sizes="28px"
                  className="object-contain brightness-0 invert"
                />
                <span className="sr-only">
                  <MessageCircle size={22} />
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
