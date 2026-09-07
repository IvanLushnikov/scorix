/** Omnichannel cabinet pages. Copy from New handoff OC-E0…E4 / cabinet-ia. No secrets. */

export const COMBINE_WARNING =
  "Общий сценарий на звонок и чат. Роботу нужно больше контекста: что говорить в трубке и что писать в мессенджере. Допишите оба канала, иначе в одном из них он потеряется.";

export const CONNECTIONS_SEGMENTS = [
  { id: "telephony", label: "Телефония" },
  { id: "messengers", label: "Мессенджеры" },
  { id: "crm", label: "CRM" },
  { id: "delivery", label: "Доставка" },
];

export function connectionsSegmentsHtml(active = "telephony", { returnTo = "" } = {}) {
  const q = returnTo ? `?return=${encodeURIComponent(returnTo)}` : "";
  return `<nav class="desk-segments" aria-label="Разделы подключений">
    ${CONNECTIONS_SEGMENTS.map(
      (s) =>
        `<a href="#/cabinet/connections/${s.id}${q}" class="desk-segment${s.id === active ? " is-active" : ""}"${s.id === active ? ' aria-current="page"' : ""}>${s.label}</a>`
    ).join("")}
  </nav>`;
}

export function pageMessengersSegment({ messengers = null, returnTo = "" } = {}) {
  const providers = messengers?.providers || [];
  const tg = providers.find((p) => p.kind === "telegram");
  const vk = providers.find((p) => p.kind === "vk");
  const back =
    returnTo
      ? `<p class="hint"><a class="desk-inline-link" href="#${escape(returnTo.startsWith("/") ? returnTo : `/${returnTo}`)}">← Вернуться к каналам кампании</a></p>`
      : "";
  return `
    <div class="conn-segment" data-omni-page="messengers" data-conn-seg="messengers">
      <h2 class="section-title-bar">Мессенджеры</h2>
      <p class="hint">Вставьте токен из кабинета мессенджера. Токен сохраним, но снова не покажем.</p>
      ${back}
      <form class="desk-form-stack" data-omni-connect>
        <label>Telegram-бот, токен<input name="telegram_token" type="password" autocomplete="off" placeholder="${tg?.connected ? "подключён" : ""}"></label>
        <label>VK, ключ сообщества<input name="vk_token" type="password" autocomplete="off" placeholder="${vk?.connected ? "подключён" : ""}"></label>
        <button type="submit" class="btn">Проверить и подключить</button>
      </form>
      <p class="hint">WhatsApp — заготовка, включить как рабочий нельзя.</p>
      <button type="button" class="btn ghost" disabled data-wa-stub>WhatsApp (скоро)</button>
    </div>`;
}

/** @deprecated Prefer segmented pageMessengersSegment + telephony/crm/delivery */
export function pageConnections({ sipDead = false, messengers = null } = {}) {
  return `
    <section class="desk-page" data-omni-page="connections">
      <h1>Подключения</h1>
      <p class="hint">Телефония, мессенджеры, CRM и доставка результатов.</p>
      ${sipDead ? `<p class="banner error banner-enter" data-inbound-sip-banner>Входящая линия SIP не поднялась. Исходящий обзвон на том же транке своими правилами.</p>` : ""}
      ${pageMessengersSegment({ messengers })}
    </section>`;
}

export function pageWebhook({ hook = null, journal = [] } = {}) {
  const rows = (journal || [])
    .map(
      (j) =>
        `<tr class="desk-row"><td>${escape(j.time || j.event_id || "")}</td><td>${escape(j.event || j.event_id || "")}</td><td>${escape(String(j.http_status || ""))}</td><td>${escape(String(j.attempt || j.retried || ""))}</td></tr>`
    )
    .join("");
  const recent = (journal || []).slice(-5);
  const deliveryFailing = recent.length > 0 && recent.every((j) => j.status === "failed" || j.status === "exhausted");
  const empty = !hook?.url;
  return `
    <div class="conn-segment" data-omni-page="webhook" data-conn-seg="delivery">
      <h2 class="section-title-bar">Доставка результатов</h2>
      <p class="hint">Шлём события на ваш HTTPS URL. Кампанию при сбое не останавливаем.</p>
      ${empty ? `<p class="banner banner-warn desk-banner banner-enter" data-webhook-empty-banner>Доставка не настроена. Укажите HTTPS URL ниже.</p>` : ""}
      ${deliveryFailing ? `<p class="banner error banner-enter" data-webhook-fail-banner>Последние доставки не проходят. Откройте журнал.</p>` : ""}
      <form class="desk-form-stack" data-omni-webhook>
        <label>HTTPS URL<input name="url" type="url" required value="${escape(hook?.url || "")}"></label>
        <label>Секрет<input name="secret" type="password" autocomplete="new-password" placeholder="${hook?.has_secret ? "задан" : ""}"></label>
        <p class="hint">Покажем один раз. Потом только «задан».</p>
        <p class="once-secret" data-omni-secret-once hidden></p>
        <fieldset>
          <legend>Какие события слать</legend>
          <label><span>Завершён</span><input type="checkbox" name="filter" value="outbound.member.completed_topics"></label>
          <label><span>Недозвон</span><input type="checkbox" name="filter" value="outbound.member.no_answer"></label>
          <label><span>Сообщение в чате</span><input type="checkbox" name="filter" value="messenger.bot.replied"></label>
          <label><span>Передали человеку</span><input type="checkbox" name="filter" value="handoff.opened"></label>
          <label><span>Оператор не взял</span><input type="checkbox" name="filter" value="messenger.awaiting_handoff"></label>
          <label><span>Входящий вне часов</span><input type="checkbox" name="filter" value="inbound.missed_offhours"></label>
          <label><span>Переадресация</span><input type="checkbox" name="filter" value="inbound.forwarded"></label>
        </fieldset>
        <label class="desk-check-row"><input type="checkbox" name="active" ${hook?.active === false ? "" : "checked"}> Включить доставку</label>
        <button type="submit" class="btn">Сохранить</button>
      </form>
      <h3 class="desk-block-title">Журнал доставок</h3>
      <div class="desk-table-surface">
        <table class="data" data-omni-journal>
          <thead><tr><th>Время</th><th>Событие</th><th>HTTP</th><th>Повтор</th></tr></thead>
          <tbody>${rows || `<tr><td colspan="4" class="hint">Пока нет доставок.</td></tr>`}</tbody>
        </table>
      </div>
    </div>`;
}

export function pageUsage({ usage = null } = {}) {
  const u = usage || {};
  const kb = u.knowledge || {};
  const used = kb.used_mb ?? Math.round((kb.used_bytes || u.knowledge_bytes || 0) / (1024 * 1024));
  const limit = kb.limit_mb ?? 500;
  return `
    <div class="reports-usage" data-omni-page="usage">
      <h2 class="section-title-bar">Использование</h2>
      <ul data-omni-usage class="usage-list">
        <li>Исходящие, мин: ${u.outbound_minutes ?? 0}</li>
        <li>Входящие, мин: ${u.inbound_minutes ?? 0}</li>
        <li>Сообщения бота: ${u.bot_dialogs ?? 0}</li>
        <li>База знаний: ${used} из ${limit} МБ</li>
      </ul>
      <p class="hint">Квота знаний — не «Недостаточно средств». Цен здесь нет.</p>
    </div>`;
}

export function pageKnowledge({ layer = "company", knowledge = null } = {}) {
  const title = layer === "company" ? "База знаний" : "База этой кампании";
  const used = knowledge?.used_mb ?? 0;
  const limit = knowledge?.limit_mb ?? 500;
  const items = knowledge?.items || [];
  const full = used >= limit;
  const list = items
    .map((it) => {
      const badge = it.state === "draft" ? `<span class="badge">Черновик · Робот это ещё не читает</span>` : escape(it.published_at || "опубликовано");
      const action =
        it.state === "draft"
          ? `<button type="button" class="btn ghost" data-kb-delete="${escape(it.id)}">Удалить</button>`
          : `<button type="button" class="btn ghost" data-kb-unpublish="${escape(it.id)}">Снять с публикации</button>`;
      return `<li data-doc="${escape(it.id)}">${escape(it.name)} — ${badge} ${action}</li>`;
    })
    .join("");
  return `
    <section class="desk-page" data-omni-page="knowledge" data-kb-layer="${layer}">
      <h1>${title}</h1>
      <p data-kb-quota>Занято ${used} из ${limit} МБ</p>
      <p class="hint">${layer === "company" ? "Общие документы компании. Робот берёт их вместе с базой кампании." : "Документы этой кампании. Если факт спорит с общей базой — берём этот слой."}</p>
      <p class="hint">Черновик робот ещё не читает. Публикуйте вручную.</p>
      ${items.length ? `<ul data-kb-list>${list}</ul>` : `<p class="hint">Пока нет документов. Загрузите файл или напишите текст.</p>`}
      <form data-omni-kb>
        <textarea name="text" placeholder="Напишите текст…"></textarea>
        <label>Файл (.txt, .md, .csv, .json)<input type="file" name="file" accept=".txt,.md,.csv,.json"></label>
        <label><input type="checkbox" name="pii"> В индекс попадёт текст файла, включая личные данные, если они там есть.</label>
        <p class="hint">Робот читает опубликованные файлы. Не кладите сюда то, чего не должно быть в ответах.</p>
        <button type="submit" class="btn" ${full ? "disabled" : ""}>Загрузить</button>
        <button type="button" class="btn secondary" data-kb-publish ${full ? "disabled" : ""}>Опубликовать</button>
      </form>
    </section>`;
}

/** Deprecated root inbox — keep for rare deep-link, not in nav. */
export function pageDialogs({ items = [], empty = true } = {}) {
  const rows = (items || [])
    .map(
      (it) => `<article class="panel" data-dialog="${escape(it.id)}">
        <p>${escape(it.phone_masked || it.contact_masked || "")} · ${escape(it.channel_kind || it.channel || "")}</p>
        <p class="hint">${escape(it.preview || "")}</p>
        <p class="hint">${it.status === "accepted" ? "Робот в этом чате больше не пишет." : ""}</p>
        <button type="button" class="btn" data-dialog-accept="${escape(it.id)}">Принять</button>
        <button type="button" class="btn secondary" data-dialog-reply="${escape(it.id)}">Ответить</button>
        <button type="button" class="btn ghost" data-dialog-close="${escape(it.id)}">Закрыть</button>
      </article>`
    )
    .join("");
  return `
    <section class="desk-page" data-omni-page="dialogs">
      <h1>Диалоги</h1>
      <p class="hint">Раздел устарел. Переписка работает через каналы кампании.</p>
      <p class="hint"><a href="#/cabinet/campaigns">К кампаниям</a></p>
      ${empty && !rows ? `<p class="hint">Пока нет диалогов.</p>` : ""}
      <div data-omni-inbox>${rows}</div>
    </section>`;
}

export function pageCrm({ crm = null } = {}) {
  const preset = crm?.preset_id || "none";
  return `
    <div class="conn-segment" data-omni-page="crm" data-conn-seg="crm">
      <h2 class="section-title-bar">CRM</h2>
      <p class="hint">Укажите заготовку и ключ. Это каркас, не витрина всех CRM.</p>
      <p class="hint">${crm?.connected ? "Подключено" : "Не подключено"}</p>
      <form class="desk-form-stack" data-omni-crm>
        <label>Заготовка
          <select name="preset">
            <option value="none" ${preset === "none" ? "selected" : ""}>Не подключать</option>
            <option value="bitrix24" ${preset === "bitrix24" ? "selected" : ""}>Битрикс24</option>
            <option value="amocrm" ${preset === "amocrm" ? "selected" : ""}>amoCRM</option>
            <option value="salesforce" ${preset === "salesforce" ? "selected" : ""}>Salesforce</option>
            <option value="hubspot" ${preset === "hubspot" ? "selected" : ""}>HubSpot</option>
            <option value="zoho_crm" ${preset === "zoho_crm" ? "selected" : ""}>Zoho CRM</option>
            <option value="pipedrive" ${preset === "pipedrive" ? "selected" : ""}>Pipedrive</option>
            <option value="megaplan" ${preset === "megaplan" ? "selected" : ""}>Мегаплан</option>
            <option value="retailcrm" ${preset === "retailcrm" ? "selected" : ""}>RetailCRM</option>
            <option value="dynamics365" ${preset === "dynamics365" ? "selected" : ""}>Microsoft Dynamics 365 Sales</option>
            <option value="custom_rest" ${preset === "custom_rest" ? "selected" : ""}>Свой REST / webhook</option>
          </select>
        </label>
        <label>Ключ<input name="secret" type="password" autocomplete="off"></label>
        <p class="hint">Ключ сохраним, но снова не покажем.</p>
        <button type="submit" class="btn">Подключить</button>
      </form>
    </div>`;
}

export function pageInboundLine({ line = null, report = [], campaignSync = false, formless = false, embedded = false } = {}) {
  const hours = line?.hours || {};
  const rows = (report || [])
    .map((r) => `<tr><td>${escape(r.phone_masked || "")}</td><td>${escape(r.label || r.inbound_result || "")}</td></tr>`)
    .join("");
  const form = formless
    ? `<p class="hint" data-omni-inbound-no-context>Линия настраивается внутри кампании: откройте кампанию → Каналы → Входящая линия.</p>`
    : `<form data-omni-inbound>
        <label>Номер, на который звонят<input name="did" required value="${escape(line?.did_number || "")}"></label>
        <label>Часы с<input name="from" type="number" value="${escape(hours.from ?? "")}"> до <input name="to" type="number" value="${escape(hours.to ?? "")}"></label>
        <label>Переадресация вне часов<input name="forward" value="${escape(line?.forward_number || "")}"></label>
        <label><input type="checkbox" name="followup" ${line?.followup_after_inbound ? "checked" : ""}> После входящего написать в мессенджер</label>
        <p class="hint">Не пишем, если уже перевели на человека.</p>
        <button type="submit" class="btn">Сохранить</button>
      </form>
      <p class="omni-inbound-error" data-omni-inbound-error hidden></p>`;
  const head = embedded
    ? `<h3 class="desk-block-title">Входящая линия</h3>`
    : `<h1>Входящая линия</h1>`;
  return `
    <section class="${embedded ? "inbound-embed" : "desk-page"}" data-omni-page="inbound">
      ${head}
      <p class="hint">Очереди нет: занято или перевод, без «вы N-й».</p>
      ${formless ? "" : `<p class="hint">Укажите номер, часы и что делать вне часов.</p>`}
      ${form}
      ${campaignSync ? `<label><input type="checkbox" data-crm-sync> Писать в CRM по этой кампании</label>` : ""}
      ${
        embedded
          ? ""
          : `<h2>Входящие</h2>
      ${rows ? `<table><thead><tr><th>Контакт</th><th>Исход</th></tr></thead><tbody>${rows}</tbody></table>` : `<p class="hint">Пока нет данных. Запустите кампанию или смените вкладку.</p>`}`
      }
    </section>`;
}

export function blockChannels({
  connected = {},
  locked = false,
  policy = "off",
  mergeAccepted = false,
  messengerOptions = [],
  selectedMessenger = "",
  returnPath = "",
  inboundHtml = "",
} = {}) {
  const dis = (kind) => (connected[kind] ? "" : "disabled");
  const checked = (kind) => (connected[kind] && connected[`${kind}_on`] ? "checked" : "");
  const showPolicy = connected.messenger && connected.voice_outbound;
  const hasMessenger = Boolean(connected.messenger);
  const opts = (messengerOptions || [])
    .map((o) => {
      const sel = o.id === selectedMessenger ? " selected" : "";
      return `<option value="${escape(o.id)}"${sel}>${escape(o.label)}</option>`;
    })
    .join("");
  const connectHref = `#/cabinet/connections/messengers?return=${encodeURIComponent(returnPath || "")}`;
  return `
    <section class="workspace-tab-panel" data-tab="channels" data-omni-page="channels">
      <h2 class="section-title-bar">Каналы</h2>
      <p class="hint">Выберите, чем кампания достаёт человека: звонок, чат или оба.</p>
      <form data-omni-channels ${locked ? "data-locked=1" : ""}>
        <label><input type="checkbox" name="voice_outbound" ${dis("voice_outbound")} ${checked("voice_outbound")}> Исходящий голос</label>
        <label><input type="checkbox" name="voice_inbound" ${dis("voice_inbound")} ${checked("voice_inbound")}> Входящий голос</label>
        <label><input type="checkbox" name="messenger" ${dis("messenger")} ${checked("messenger")}> Мессенджер</label>
        ${
          hasMessenger
            ? `<div class="channels-messenger-pick">
          <label>Выберите подключение
            <select name="messenger_instance" ${locked ? "disabled" : ""}>
              <option value="">—</option>
              ${opts}
            </select>
          </label>
          <a class="btn secondary" href="${connectHref}">Подключить новую</a>
        </div>`
            : `<p class="hint channels-locked-hint">Сначала подключите в разделе «Подключения».</p>
               <a class="btn secondary" href="${connectHref}">Подключить</a>`
        }
        <fieldset data-omni-policy ${showPolicy ? "" : "hidden"}>
          <legend>Когда писать в мессенджер</legend>
          <label><input type="radio" name="policy" value="voice_only" ${policy === "off" || policy === "voice_only" ? "checked" : ""}> Только звонок</label>
          <label><input type="radio" name="policy" value="always" ${policy === "always" ? "checked" : ""}> Всегда писать</label>
          <label><input type="radio" name="policy" value="on_no_answer" ${policy === "on_no_answer" ? "checked" : ""}> Писать при недозвоне</label>
        </fieldset>
        ${showPolicy ? "" : `<p class="hint" data-omni-policy-hidden>Включите мессенджер в Каналах.</p>`}
        <input type="hidden" name="merge_accepted" value="${mergeAccepted ? "1" : ""}">
        <button type="submit" class="btn" ${locked ? "disabled" : ""}>Сохранить</button>
      </form>
      ${locked ? `<p class="hint">Каналы и сценарий после запуска только смотреть. Новую склейку — новой кампанией.</p>` : ""}
      ${inboundHtml}
      <dialog data-omni-combine>
        <p>${COMBINE_WARNING}</p>
        <button type="button" data-combine-yes>Объединить</button>
        <button type="button" data-combine-no>Оставить раздельно</button>
      </dialog>
    </section>`;
}

export function pageChatReport({ rows = [] } = {}) {
  const body = rows
    .map(
      (r) =>
        `<tr><td>${escape(r.phone_masked || "")}</td><td>${escape(r.column_label || r.column || "")}</td><td>${escape(r.outbound_status || "")}</td></tr>`
    )
    .join("");
  return `<div class="workspace-tab-panel results-chat" data-tab="chat" data-omni-page="chat">
    <h3 class="desk-block-title">Чат</h3>
    <p class="hint">Колонка чата: ответил робот · передали · оператор не взял · нет канала · платформа не приняла · канал error. Не новый статус обзвона.</p>
    ${body ? `<table class="data"><thead><tr><th>Контакт</th><th>Чат</th><th>Исходящий</th></tr></thead><tbody>${body}</tbody></table>` : `<p class="hint">Пока нет данных. Запустите кампанию или смените вкладку.</p>`}
  </div>`;
}

export function deliveryStatusBlock({ hook = null, journal = [] } = {}) {
  const recent = (journal || []).slice(-5);
  const failing = recent.length > 0 && recent.every((j) => j.status === "failed" || j.status === "exhausted");
  let label = "Не настроена";
  let tone = "empty";
  if (hook?.url) {
    if (failing) {
      label = "Падает";
      tone = "danger";
    } else if (hook.active !== false) {
      label = "Ок";
      tone = "ok";
    } else {
      label = "Не настроена";
      tone = "empty";
    }
  }
  return `<section class="delivery-status-block" data-testid="delivery-status">
    <h3 class="section-title-bar">Доставка результатов</h3>
    <div class="delivery-status-row">
      <span class="status-badge status-badge--${tone} status-badge--compact">${label}</span>
      <a class="desk-inline-link" href="#/cabinet/connections/delivery">Настроить</a>
    </div>
  </section>`;
}

export function contactCardBlocks({ outbound = "", inbound = "", chat = "" } = {}) {
  return `
    <section data-contact-card>
      <h3>Исходящий обзвон</h3>
      <p data-outbound-status>${escape(outbound)}</p>
      <h3>Входящие</h3>
      <p data-inbound-status>${escape(inbound)}</p>
      <h3>Чат</h3>
      <p data-messenger-status>${escape(chat)}</p>
    </section>`;
}

export function campaignKnowledgeBlock(knowledge) {
  return pageKnowledge({ layer: "campaign", knowledge });
}

function escape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
