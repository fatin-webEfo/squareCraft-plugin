export function ToolbarIconHtml(data = []) {
  const sectionHtml = data
    .map((section, index) => {
      const blocks = section.blocks
        .map(
          (blk) =>
            `<div class="sc-font-size-11 sc-text-color-white sc-ml-2">🔹 <strong>${blk.blockId}</strong> <span style="color:#EF7C2F">(${blk.type})</span></div>`
        )
        .join("");

      return `
        <div class="sc-mb-4">
          <div class="sc-font-size-12 sc-text-color-EF7C2F sc-mb-1">📦 Section ${
            index + 1
          } — <code>${
        section.sectionId
      }</code> <span class="sc-text-color-white">[${
        section.sectionType
      }]</span></div>
          ${
            blocks ||
            `<div class="sc-font-size-11 sc-ml-2 sc-text-color-gray">No blocks found</div>`
          }
        </div>`;
    })
    .join("");

  return `
    <div id="sc-grabbing" class="sc-cursor-grabbing sc-w-full">
      <div class="sc-flex sc-roboto sc-universal sc-items-center sc-justify-between">
        <img class="sc-cursor-grabbing sc-universal" src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />
      </div>
      <div class="sc-mt-4">
        <p class="sc-font-size-12 sc-universal sc-roboto sc-font-light">
          Powerful Visual Editor for Customizing Squarespace Sections in Real-Time.
        </p>
      </div>
    </div>
    <div class="sc-mt-6 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949 sc-w-full"></div>
    <div class="sc-mt-6 sc-h-12 sc-roboto sc-flex sc-items-center sc-universal">
      <p class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Design</p>
      <p class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Advanced</p>
      <p class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Presets</p>
    </div>
    <div class="sc-border-t sc-border-solid sc-relative sc-border-color-494949 sc-w-full">
      <div class="sc-absolute sc-top-0 sc-left-0 sc-bg-color-EF7C2F sc-w-16 sc-h-1px sc-tab-active-indicator"></div>
    </div>
    <div class="sc-rounded-4px sc-h-350 sc-scrollBar sc-mt-6 sc-border sc-border-solid sc-border-EF7C2F sc-bg-color-3d3d3d sc-p-2 sc-overflow-y-scroll">
      ${
        sectionHtml ||
        `<div class="sc-text-color-white sc-font-size-12">No sections detected.</div>`
      }
    </div>
    <div class="sc-mt-3">
      <div class="sc-flex sc-items-center sc-justify-between sc-gap-2">
        <div class="sc-cursor-pointer sc-roboto sc-bg-color-EF7C2F sc-w-full sc-font-light sc-flex sc-items-center sc-font-size-12 sc-py-1 sc-rounded-4px sc-text-color-white sc-justify-center">
          Publish
        </div>
        <div class="sc-cursor-pointer sc-roboto sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-light sc-flex sc-font-size-12 sc-py-1 sc-rounded-4px sc-items-center sc-justify-center">
          Reset
        </div>
      </div>
    </div>`;
}
