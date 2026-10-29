import { getPageContent } from "@/lib/dept/getPageContent";
import {
  getStaffSections,
  mailtoHref,
  type StaffMember,
  type StaffSection,
} from "@/lib/dept/getStaffSections";

export const metadata = { title: "スタッフ | 顎機能咬合再建学分野" };

// The roster comes from the Studio (スタッフページ) and is rendered here in the
// legacy page's own markup — #smenu, .staff_box, .staff_t — so dept.css styles
// it exactly as before. staff.html is no longer the source; it stays only as
// the fallback if Sanity cannot be reached or holds no staff page yet.

/** Sanity stores plain text, and this lands inside dangerouslySetInnerHTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const lines = (text: string) =>
  text.split(/\r?\n/).map(escapeHtml).join("<br />\n    ");

function memberHtml({ name, img, note, specialties, email }: StaffMember): string {
  const info = [
    note && `  <p>\n    ${lines(note)}\n  </p>`,
    specialties.length > 0 &&
      `  <span class="s_title">【専門分野】</span>\n  <p>\n    ${specialties
        .map(escapeHtml)
        .join("<br />\n    ")}\n  </p>`,
  ]
    .filter(Boolean)
    .join("\n");

  const mail = email
    ? `<a href="${escapeHtml(mailtoHref(email))}">${escapeHtml(email)}</a>`
    : "";

  return `<table border="0" cellspacing="0" cellpadding="0" class="staff_t">
<tr>
<td width="140"><img src="${escapeHtml(img)}" width="140" height="140" alt="${escapeHtml(name)}"></td>
<td>
${info}
</td>
</tr>
<tr>
<td class="name">${escapeHtml(name)}</td>
<td>${mail}</td>
</tr>
</table>`;
}

function sectionHtml({ id, title, members }: StaffSection): string {
  return `<a id="${escapeHtml(id)}"></a>
<h3>${escapeHtml(title)}</h3>
<div class="staff_box">
${members.map(memberHtml).join("\n\n")}
</div>
<!--.staff_box-->

<div class="crr"></div>`;
}

function pageHtml(sections: StaffSection[]): string {
  const menu = sections
    .map(({ id, title }) => `      <li><a href="#${escapeHtml(id)}">${escapeHtml(title)}</a></li>`)
    .join("\n");

  return `<div id="wrap">

<div id="main">

<div id="page_l">
  <div id="smenu">
    <ul class="smenu">
${menu}
      <li class="li_none"><a href="#"><img src="/images/pagetop.jpg" width="140" height="30" alt="pagetop" /></a></li>
    </ul>
  </div>
</div>
<!--#page_l-->

<div id="page_r">
<h2>スタッフ</h2>
${sections.map(sectionHtml).join("\n\n")}

</div>
<!--#page_r-->

</div>
<!--#main-->

</div>`;
}

export default async function Staff() {
  let sections: StaffSection[] = [];
  try {
    sections = await getStaffSections("ja");
  } catch {
    // fall through to the legacy file below
  }

  const html = sections.length > 0 ? pageHtml(sections) : getPageContent("staff");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
