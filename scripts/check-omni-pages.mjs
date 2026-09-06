/**
 * Guard omnichannel cabinet copy and public-safety (no HQ secrets).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = readFileSync(join(root, "src/omni-pages.js"), "utf8");
const app = readFileSync(join(root, "src/app.js"), "utf8");
const bind = readFileSync(join(root, "src/omni-bind.js"), "utf8");
const api = readFileSync(join(root, "src/api.js"), "utf8");

const COMBINE =
  "Общий сценарий на звонок и чат. Роботу нужно больше контекста: что говорить в трубке и что писать в мессенджере. Допишите оба канала, иначе в одном из них он потеряется.";

assert.ok(pages.includes(COMBINE), "combine warning verbatim");
assert.match(pages, /Объединить/);
assert.match(pages, /Оставить раздельно/);
assert.match(pages, /WhatsApp \(скоро\)/);
assert.match(pages, /Пока нет диалогов/);
assert.match(pages, /Занято/);
assert.match(pages, /Робот это ещё не читает/);
assert.doesNotMatch(pages, /HarpGit|sip_password|goal_verdicts/);
assert.match(app, /Подключения/);
assert.match(app, /База знаний/);
assert.match(app, /#\/cabinet\/connections/);
assert.match(app, /bindOmniPages/);
assert.match(bind, /data-combine-yes/);
assert.match(bind, /combine_ack_required/);
assert.match(api, /\/api\/cabinet\/webhook/);
assert.match(api, /\/api\/cabinet\/knowledge/);
assert.match(api, /\/api\/cabinet\/messengers/);
assert.match(api, /\/api\/cabinet\/crm/);
assert.doesNotMatch(app, /пункт кампании.*Телефония/);

// P1-5: webhook decline banner — exact TZ §5 wording, rendered conditionally (not a hardcoded toast).
assert.match(pages, /Последние доставки не проходят\. Откройте журнал\./);
assert.match(pages, /data-webhook-fail-banner/);
// P1-4: messenger "проверить связь" is a distinct live step, not just PUT-save.
assert.match(api, /\/verify/);
assert.match(bind, /verifyOmniMessenger/);
// P1-3: real file upload path for the knowledge base, not text-only.
assert.match(pages, /type="file"/);
assert.match(api, /knowledge\/files|FormData/);
// P1-2: chat report reads real data, not a hardcoded empty stub.
assert.doesNotMatch(app, /pageChatReport\(\{\s*rows:\s*\[\]\s*\}\)/);
assert.match(api, /\/api\/cabinet\/reports\/chat/);
// P2-3: standalone #/cabinet/inbound has no campaign context, so it must not render
// a fake blank settings form (line is always per-campaign) — point to the campaign tab instead.
assert.match(app, /pageInboundLine\(\{\s*line:\s*null,\s*report:\s*state\.omni\.inboundReport,\s*formless:\s*true\s*\}\)/);
assert.match(pages, /formless/);
assert.match(pages, /откройте кампанию/i);
// D-E3-002: omnichannel policy without chat must say why it's hidden, not just vanish.
assert.match(pages, /Включите мессенджер в Каналах\./);
// D-E3-005: chat report reasons must cover all three documented causes, not just "нет канала".
assert.match(pages, /платформа не приняла/);
assert.match(pages, /канал error/);
// D-E3-003 / E3-012: contacts import must say telegram/vk columns are optional (found by phone).
assert.match(app, /Id можно не заполнять — поищем по номеру\./);
assert.match(app, /telegram,vk/);

// E2-045: "Подключения" SIP banner must come from a real inbound/check probe, not a
// flag nobody sets (see docs/handoff/fe/E2-045-connections-sip-health.md, New repo).
assert.match(pages, /data-inbound-sip-banner/);
assert.match(pages, /Входящая линия SIP не поднялась\. Исходящий обзвон на том же транке своими правилами\./);
assert.match(api, /inbound\/check/);
assert.match(api, /checkOmniInboundLine/);
assert.match(app, /checkOmniInboundLine/);
assert.match(app, /checkInboundSipHealth/);
assert.match(app, /inboundSipDead\s*=\s*await checkInboundSipHealth\(\)/);
// live_credentials_required (no live probe in this env) must not be treated as a real outage.
assert.match(app, /connection_status\s*===\s*"error"/);
assert.doesNotMatch(app, /inboundSipDead\s*=\s*true/);

console.log("omni-pages-contract ok");
