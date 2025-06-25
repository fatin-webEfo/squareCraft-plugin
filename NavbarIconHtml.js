export function NavbarIconHtml() {
 

  return `
      <div id="icon-options">
  <div style="padding: 12px 16px; color: white; font-size: 14px; display: flex; align-items: center; justify-content: space-between;">
    <span style="font-size: 18px; font-weight: 400;">SquareCraft</span>
   
  </div>
  <div style="background: #EF7C2F; color: white; font-size: 12px; padding: 6px 12px; text-align: center;">
    Your free trial expires in 0 days. <span style="text-decoration: underline; cursor: pointer;">Click here to upgrade.</span>
  </div>
   <div id="viewport-sections" style=" display: flex; align-items: center; gap: 10px; justify-content: center;">
      <img id="mobile-viewport" class="sc-cursor-pointer" src="https://fatin-webefo.github.io/squareCraft-plugin/public/viewport/mobile.svg" style="width: 18px;">
      <img id="tab-viewport" class="sc-cursor-pointer" src="https://fatin-webefo.github.io/squareCraft-plugin/public/viewport/tab.svg" style="width: 18px;">
      <img id="laptop-viewport" class="sc-cursor-pointer" src="https://fatin-webefo.github.io/squareCraft-plugin/public/viewport/laptop.svg" style="width: 18px;">
      <img id="dekstop-viewport" class="sc-cursor-pointer" src="https://fatin-webefo.github.io/squareCraft-plugin/public/viewport/monitor.svg" style="width: 18px;">
    </div>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #2c2c2c; padding: 1px;">
    <div style="background:#1f1f1f; color:white; font-size:12px; text-align:center; padding: 16px 0; cursor:pointer; transition:background 0.2s;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;"
      onmouseenter="this.style.background='#3a3a3a'"
      onmouseleave="this.style.background='#1f1f1f'">
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/global.svg" style="width: 18px; height: 18px;" />
      <span style="font-weight: 300; color:rgb(194, 197, 204);">Global</span>
    </div>
    <div style="background:#1f1f1f; color:white; font-size:12px; text-align:center; padding: 16px 0; cursor:pointer; transition:background 0.2s;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;"
      onmouseenter="this.style.background='#3a3a3a'"
      onmouseleave="this.style.background='#1f1f1f'">
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/page.svg" style="width: 18px; height: 18px;" />
      <span style="font-weight: 300; color:rgb(194, 197, 204);">Page</span>
    </div>
    <div style="background:#1f1f1f; color:white; font-size:12px; text-align:center; padding: 16px 0; cursor:pointer; transition:background 0.2s;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;"
      onmouseenter="this.style.background='#3a3a3a'"
      onmouseleave="this.style.background='#1f1f1f'">
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/template.svg" style="width: 18px; height: 18px;" />
      <span style="font-weight: 300; color:rgb(194, 197, 204);">Template</span>
    </div>
    <div style="background:#1f1f1f; color:white; font-size:12px; text-align:center; padding: 16px 0; cursor:pointer; transition:background 0.2s;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;"
      onmouseenter="this.style.background='#3a3a3a'"
      onmouseleave="this.style.background='#1f1f1f'">
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/settings.svg" style="width: 18px; height: 18px;" />
      <span style="font-weight: 300; color:rgb(194, 197, 204);">Settings</span>
    </div>
    <div style="background:#1f1f1f; color:white; font-size:12px; text-align:center; padding: 16px 0; cursor:pointer; transition:background 0.2s;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;"
      onmouseenter="this.style.background='#3a3a3a'"
      onmouseleave="this.style.background='#1f1f1f'">
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/subscription.svg" style="width: 18px; height: 18px;" />
      <span style="font-weight: 300; color:rgb(194, 197, 204);">Subscription</span>
    </div>
    <div style="background:#1f1f1f; color:white; font-size:12px; text-align:center; padding: 16px 0; cursor:pointer; transition:background 0.2s;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;"
      onmouseenter="this.style.background='#3a3a3a'"
      onmouseleave="this.style.background='#1f1f1f'">
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/support.svg" style="width: 18px; height: 18px;" />
      <span style="font-weight: 300; color:rgb(194, 197, 204);">Support</span>
    </div>
  </div>
</div>

    `;
}
