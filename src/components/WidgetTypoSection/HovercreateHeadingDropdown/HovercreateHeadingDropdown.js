import { HoverTypoLinkSelect } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/Typo/HoverTypoLinkSelect.js";
import { HoverTypoAllSelect } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/Typo/HoverTypoAllSelect.js";
import { HoverTypoBoldSelect } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/Typo/HoverTypoBoldSelect.js";
import { HoverTypoItalicSelect } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/Typo/HoverTypoItalicSelect.js";

export function HovercreateHeadingDropdown(
  id,
  fontSizes = [],
  LetterSpacing = [],
  fontFamily = []
) {
  return `
    <div id="hover-${id}">
        <div class="sc-mt-2 sc-px-2 sc-gap-2">
          <div class="sc-flex sc-mt-2 sc-justify-between sc-items-center">
            <div class="sc-flex sc-items-center sc-justify-between">
              <div id="hover-${id}-allSelect" class="sc-px-2 sc-py-1px sc-select-activeTab-border sc-cursor-pointer sc-rounded-l">
                <p class="sc-universal sc-text-sm sc-poppins">All</p>
              </div>
              <div id="hover-${id}-boldSelect" class="sc-px-2 sc-py-1px sc-select-inActiveTab-border sc-cursor-pointer">
                <p class="sc-font-bold sc-universal sc-text-sm sc-poppins">Bold</p>
              </div>
              <div id="hover-${id}-italicSelect" class="sc-px-2 sc-py-1px sc-select-inActiveTab-border sc-cursor-pointer">
                <p class="sc-font-italic sc-universal sc-text-sm sc-text-center sc-mx-auto">Italic</p>
              </div>
              <div id="hover-${id}-linkSelect" class="sc-px-2 sc-py-sm sc-flex sc-items-center sc-gap-2 sc-select-inActiveTab-border sc-cursor-pointer sc-rounded-r">
                <p class="sc-universal sc-text-sm sc-text-center sc-mx-auto">Link</p>
                <img src="https://i.ibb.co.com/jvHLfd8c/Group.png" class="sc-w-4 sc-h-4 sc-object-contain" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="sc-mt-4 sc-px-2">
          <div class="sc-text-xs sc-text-gray-400 sc-mt-1" id="hover-scDesc-${id}-allSelect">
          ${HoverTypoAllSelect(fontSizes, LetterSpacing)}
        </div>
          <div class="sc-text-xs sc-text-gray-400 sc-mt-1 sc-hidden" id="hover-scDesc-${id}-boldSelect">
          ${HoverTypoBoldSelect(fontSizes, LetterSpacing, fontFamily)}
        </div>
          <div class="sc-text-xs sc-text-gray-400 sc-mt-1 sc-hidden" id="hover-scDesc-${id}-italicSelect">
          ${HoverTypoItalicSelect(fontSizes, LetterSpacing)}
          </div>
          <div class="sc-text-xs sc-text-gray-400 sc-mt-1 sc-hidden" id="hover-scDesc-${id}-linkSelect">
          ${HoverTypoLinkSelect(fontSizes, LetterSpacing)}
          </div>
        </div>
      </div>
      <div class="sc-px-2">
        <div class="sc-h-1px sc-mt-4 sc-bg-3f3f3f"></div>
      </div>
  `;
}
