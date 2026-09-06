/** Thin public API client — no HQ contracts. */

export const API_BASE =
  (typeof window !== "undefined" && window.SCORIX_API_BASE) || "";

/** Stable API `code` → UI copy (do not use server message text). */
export const ERROR_MESSAGES = {
  invalid_credentials: "Неверный логин или пароль",
  auth_failed: "Неверный логин или пароль",
  invalid_totp: "Неверный код. Проверьте приложение и попробуйте снова",
  invalid_pending_token: "Время входа истекло. Войдите снова",
  totp_rate_limited: "Слишком много попыток. Подождите и войдите заново",
  totp_setup_expired: "Настройка истекла. Начните подключение заново",
  totp_already_enabled: "Двухфакторная аутентификация уже подключена",
  rate_limited: "Слишком много попыток. Подождите немного",
  invalid_session: "Сессия устарела. Войдите снова",
  forbidden: "Нет доступа",
  account_locked: "Аккаунт заблокирован",
  company_locked: "Аккаунт заблокирован",
  insufficient_balance: "Недостаточно средств",
  gate_failed: "Пока нельзя начать: проверьте условия запуска",
  already_running: "Обзвон уже идёт",
  telephony_not_ready: "Сначала подключите телефонию",
  no_contacts: "Нет контактов для обзвона",
  schedule_missing: "Задайте расписание",
  unsupported_format: "Такой формат файла не подходит",
  file_too_large: "Файл слишком большой",
  missing_columns: "В файле не хватает нужных колонок",
  login_taken: "Такой логин уже занят",
  company_has_running_campaign: "Сначала остановите обзвон в этой компании",
  balance_not_zero: "Подтвердите списание остатка баланса",
  not_found: "Не найдено",
  campaign_not_found: "Кампания не найдена",
  company_not_found: "Не найдено",
  campaign_not_found: "Кампания не найдена",
  campaign_running: "Сейчас идёт обзвон. Остановите его и повторите удаление данных.",
  confirm_required: "Подтвердите удаление в окне.",
  purge_failed: "Не удалось удалить данные. Попробуйте ещё раз",
  validation: "Проверьте поля",
  validation_error: "Проверьте поля",
  revision_conflict: "Данные устарели — обновите страницу и повторите",
  invalid_provider: "Такой провайдер недоступен",
  provider_not_available_for_kind: "Этот провайдер не подходит для этого блока",
  invalid_field: "Проверьте поля",
  invalid_model: "Выберите модель из списка",
  custom_endpoint_forbidden: "Свой адрес сервера указать нельзя",
  secret_not_configured: "Сначала запишите API-ключ",
  secret_store_unavailable: "Хранилище ключей недоступно",
  provider_unavailable: "Провайдер недоступен. Попробуйте позже",
  check_failed: "Проверка не прошла",
  not_configured: "Сначала сохраните настройки",
  sip_auth_failed: "Неверный логин или пароль SIP",
  sip_network: "Не удалось связаться с вашей АТС. Проверьте адрес и доступность",
  sip_rejected: "Сервер телефонии отклонил подключение",
  sip_unknown: "Не удалось проверить SIP. Попробуйте позже",
  combine_ack_required: "Покажите предупреждение ещё раз. Не тост.",
  inbound_number_bound: "Этот номер уже привязан к другой кампании",
  knowledge_quota_exceeded: "Занято 500 МБ. Удалите файлы или попросите поднять лимит.",
  whatsapp_not_shipped: "WhatsApp в этом корабле не рабочий",
  secret_write_only: "Секрет уже сохранён. Значение не показываем.",
  sip_unreachable: "Не удалось связаться с вашей АТС. Проверьте адрес и доступность",
  sip_invalid: "Заполните адрес SIP, логин и пароль",
  telephony_not_ready: "Сначала сохраните настройки SIP",
  api_not_configured: "Сначала укажите адрес API",
  request_failed: "Что-то пошло не так. Попробуйте ещё раз",
  server: "Что-то пошло не так. Попробуйте ещё раз",
  generate_failed:
    "Не удалось собрать сценарий. Проверьте цель и сведения и сохраните ещё раз.",
  provider_down:
    "Не удалось собрать сценарий. Проверьте цель и сведения и сохраните ещё раз.",
  weak_goal:
    "Не удалось собрать сценарий. Проверьте цель и сведения и сохраните ещё раз.",
  pack_gaps_critical:
    "Не хватает данных для этого типа звонка. Дополните контекст и сохраните ещё раз.",
  clarifications_required: "Сначала ответьте на обязательные уточнения",
  read_only_after_start: "После запуска менять нельзя. Для правок — новая кампания.",
  voice_not_configured: "Выберите голос робота",
  voice_profile_not_found: "Выбранный голос больше недоступен. Выберите другой.",
  voice_profile_unavailable: "Выбранный голос больше недоступен. Выберите другой.",
  voice_required: "Выберите голос робота",
  voice_not_available: "Выбранный голос больше недоступен. Выберите другой.",
  campaign_running_locked: "После запуска голос изменить нельзя",
  vendor_name_forbidden: "В названии нельзя указывать имя провайдера",
  use_integration_instances: "Обновите интерфейс — для ASR и TTS используйте список подключений",
  invalid_kind: "Неверный тип подключения",
  email_not_verified: "Подтвердите email. Мы отправили письмо — проверьте почту.",
  invalid_token: "Ссылка недействительна. Запросите новое письмо.",
  token_expired: "Ссылка истекла. Запросите новое письмо.",
  payment_unavailable: "Самопополнение временно недоступно",
  payment_not_found: "Платёж не найден",
  unknown_package: "Не удалось начать оплату",
};

export function hasApi() {
  return Boolean(API_BASE);
}

/** Best-effort liveness probe — used for fail-closed telephony UI. */
export async function fetchHealth() {
  if (!API_BASE) return { ok: false };
  try {
    const res = await fetch(`${API_BASE}/health`, { method: "GET" });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

export function errorMessage(code) {
  if (!code) return ERROR_MESSAGES.request_failed;
  if (ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];
  if (String(code).startsWith("sip_")) return ERROR_MESSAGES.sip_unknown;
  return ERROR_MESSAGES.request_failed;
}

function apiError(code, { details, status } = {}) {
  const err = new Error(code || "request_failed");
  err.code = code || "request_failed";
  err.details = details;
  err.status = status;
  return err;
}

async function readErrorBody(res) {
  let code = "request_failed";
  let details;
  try {
    const body = await res.json();
    if (body?.code) code = body.code;
    details = body?.details;
  } catch {
    /* ignore non-JSON */
  }
  return { code, details };
}

export async function login(loginName, password) {
  if (!API_BASE) {
    throw apiError("api_not_configured");
  }
  let res;
  try {
    res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: loginName, password }),
    });
  } catch {
    throw apiError("request_failed");
  }
  if (!res.ok) {
    const { code, details } = await readErrorBody(res);
    const mapped =
      code === "email_not_verified"
        ? "email_not_verified"
        : res.status === 401 || code === "invalid_credentials" || code === "auth_failed"
          ? "invalid_credentials"
          : code === "request_failed"
            ? "server"
            : code;
    throw apiError(mapped, { details, status: res.status });
  }
  return res.json();
}

export async function verifyTotpLogin({ pendingToken, code, recoveryCode }) {
  if (!API_BASE) {
    throw apiError("api_not_configured");
  }
  const body = { pending_token: pendingToken };
  if (code) body.code = code;
  if (recoveryCode) body.recovery_code = recoveryCode;
  let res;
  try {
    res = await fetch(`${API_BASE}/api/auth/totp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw apiError("request_failed");
  }
  if (!res.ok) {
    const { code: errCode, details } = await readErrorBody(res);
    throw apiError(errCode, { details, status: res.status });
  }
  return res.json();
}

export async function logout(session) {
  if (!API_BASE || !session) return;
  try {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session}` },
    });
  } catch {
    /* best-effort: local clear must still succeed if API is asleep/unreachable */
  }
}

export async function fetchSession(session) {
  if (!API_BASE) {
    throw apiError("api_not_configured");
  }
  return apiFetch("/api/auth/session", { session });
}

export async function publicAuthFetch(path, { method = "POST", body } = {}) {
  if (!API_BASE) {
    throw apiError("api_not_configured");
  }
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw apiError("request_failed");
  }
  if (!res.ok) {
    const { code, details } = await readErrorBody(res);
    throw apiError(code, { details, status: res.status });
  }
  if (res.status === 204) return null;
  const ctype = res.headers.get("Content-Type") || "";
  if (ctype.includes("application/json")) return res.json();
  return res;
}

export async function registerAccount({ name, login, password }) {
  return publicAuthFetch("/api/auth/register", { body: { name, login, password } });
}

export async function verifyEmail({ token }) {
  return publicAuthFetch("/api/auth/verify-email", { body: { token } });
}

export async function resendVerification({ login }) {
  return publicAuthFetch("/api/auth/resend-verification", { body: { login } });
}

export async function billingCheckout({ packageId, session, idempotencyKey }) {
  const headers = {};
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
  return apiFetch("/api/cabinet/billing/checkout", {
    method: "POST",
    session,
    body: { package_id: packageId },
    headers,
  });
}

export async function fetchBillingPackages(session) {
  return apiFetch("/api/cabinet/billing/packages", { session });
}

export async function fetchOmniChannels(campaignId, session) {
  return apiFetch(`/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/channels`, { session });
}

export async function saveOmniChannels(campaignId, body, session) {
  return apiFetch(`/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/channels`, {
    method: "PUT",
    session,
    body,
  });
}

export async function fetchOmniWebhook(session) {
  return apiFetch("/api/cabinet/webhook", { session });
}

export async function fetchOmniUsage(session) {
  return apiFetch("/api/cabinet/usage", { session });
}

export async function fetchOmniDialogs(session) {
  return apiFetch("/api/cabinet/dialogs", { session });
}

export async function saveOmniWebhook(body, session) {
  return apiFetch("/api/cabinet/webhook", { method: "PUT", session, body });
}

export async function fetchOmniWebhookJournal(session) {
  return apiFetch("/api/cabinet/webhook/journal", { session });
}

export async function fetchOmniKnowledge(session, campaignId) {
  const path = campaignId
    ? `/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/knowledge`
    : "/api/cabinet/knowledge";
  return apiFetch(path, { session });
}

export async function saveOmniKnowledgeText(body, session, campaignId) {
  const path = campaignId
    ? `/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/knowledge/texts`
    : "/api/cabinet/knowledge/texts";
  return apiFetch(path, { method: "POST", session, body });
}

export async function publishOmniKnowledge(session, campaignId) {
  const path = campaignId
    ? `/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/knowledge/publish`
    : "/api/cabinet/knowledge/publish";
  return apiFetch(path, { method: "POST", session });
}

export async function uploadOmniKnowledgeFile({ file, piiAck }, session, campaignId) {
  const path = campaignId
    ? `/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/knowledge/files`
    : "/api/cabinet/knowledge/files";
  const form = new FormData();
  form.append("file", file, file.name);
  if (piiAck) form.append("pii_ack", "1");
  return apiFetch(path, { method: "POST", session, body: form });
}

export async function unpublishOmniKnowledgeDoc(docId, session, campaignId) {
  const path = campaignId
    ? `/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/knowledge/${encodeURIComponent(docId)}/unpublish`
    : `/api/cabinet/knowledge/${encodeURIComponent(docId)}/unpublish`;
  return apiFetch(path, { method: "POST", session });
}

export async function deleteOmniKnowledgeDoc(docId, session, campaignId) {
  const path = campaignId
    ? `/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/knowledge/${encodeURIComponent(docId)}`
    : `/api/cabinet/knowledge/${encodeURIComponent(docId)}`;
  return apiFetch(path, { method: "DELETE", session });
}

export async function fetchOmniInbound(campaignId, session) {
  return apiFetch(`/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/inbound`, { session });
}

export async function saveOmniInbound(campaignId, body, session) {
  return apiFetch(`/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/inbound`, {
    method: "PUT",
    session,
    body,
  });
}

/** Live "проверить связь" for the inbound line — E2-045, separate from PUT save. */
export async function checkOmniInboundLine(campaignId, session) {
  return apiFetch(`/api/cabinet/campaigns/${encodeURIComponent(campaignId)}/inbound/check`, {
    method: "POST",
    session,
  });
}

export async function fetchOmniInboundReport(session) {
  return apiFetch("/api/cabinet/reports/inbound", { session });
}

export async function fetchOmniChatReport(session) {
  return apiFetch("/api/cabinet/reports/chat", { session });
}

export async function fetchOmniMessengers(session) {
  return apiFetch("/api/cabinet/messengers", { session });
}

export async function connectOmniMessenger(kind, body, session) {
  return apiFetch(`/api/cabinet/messengers/${encodeURIComponent(kind)}`, { method: "PUT", session, body });
}

/** Live "проверить связь" step — separate from PUT save, per OC-E3-messenger.md. */
export async function verifyOmniMessenger(kind, session) {
  return apiFetch(`/api/cabinet/messengers/${encodeURIComponent(kind)}/verify`, { method: "POST", session });
}

export async function fetchOmniCrm(session) {
  return apiFetch("/api/cabinet/crm", { session });
}

export async function saveOmniCrm(body, session) {
  return apiFetch("/api/cabinet/crm", { method: "PUT", session, body });
}

export async function acceptOmniDialog(id, session) {
  return apiFetch(`/api/cabinet/dialogs/${encodeURIComponent(id)}/accept`, { method: "POST", session });
}

export async function closeOmniDialog(id, session) {
  return apiFetch(`/api/cabinet/dialogs/${encodeURIComponent(id)}/close`, { method: "POST", session });
}

export async function replyOmniDialog(id, text, session) {
  return apiFetch(`/api/cabinet/dialogs/${encodeURIComponent(id)}/messages`, {
    method: "POST",
    session,
    body: { text },
  });
}

export async function fetchPayment(paymentId, session) {
  return apiFetch(`/api/cabinet/billing/payments/${encodeURIComponent(paymentId)}`, { session });
}

export async function apiFetch(path, { method = "GET", session, body, headers } = {}) {
  if (!API_BASE) {
    throw apiError("api_not_configured");
  }
  const hdrs = { ...(headers || {}) };
  if (session) hdrs.Authorization = `Bearer ${session}`;
  let payload = body;
  if (body && !(body instanceof FormData) && typeof body === "object") {
    hdrs["Content-Type"] = hdrs["Content-Type"] || "application/json";
    payload = JSON.stringify(body);
  }
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { method, headers: hdrs, body: payload });
  } catch {
    throw apiError("request_failed");
  }
  if (!res.ok) {
    const { code, details } = await readErrorBody(res);
    throw apiError(code, { details, status: res.status });
  }
  if (res.status === 204) return null;
  const ctype = res.headers.get("Content-Type") || "";
  if (ctype.includes("application/json")) return res.json();
  return res;
}
