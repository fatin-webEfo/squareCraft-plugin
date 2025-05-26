import { typoAllSelect } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/Typo/typoAllSelect.js"
import { typoBoldSelect } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/Typo/typoBoldSelect.js"
import { typoItalicSelect } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/Typo/typoItalicSelect.js"
import { typoLinkSelect } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/Typo/typoLinkSelect.js"

export function createHeadingDropdown(id, fontSizes = [], LetterSpacing = []) {
  return `
    <div id="${id}">
      <div class="sc-mt-2 sc-px-2 sc-gap-2">
        <div class="sc-flex sc-mt-2 sc-justify-between sc-items-center">   
          <div class="sc-flex sc-items-center sc-justify-between">
            <div id="${id}-allSelect" class="sc-px-2 sc-py-1px sc-select-activeTab-border sc-cursor-pointer sc-rounded-l">
              <p class="sc-universal sc-font-size-12 sc-roboto">All</p>
            </div>
            <div id="${id}-boldSelect" class="sc-px-2 sc-py-1px sc-select-inActiveTab-border sc-cursor-pointer">
              <p class="sc-font-bold sc-universal sc-font-size-12 sc-roboto">Bold</p>
            </div>
            <div id="${id}-italicSelect" class="sc-px-2 sc-py-1px sc-select-inActiveTab-border sc-cursor-pointer">
              <p class="sc-font-italic sc-universal sc-font-size-12 sc-text-center sc-mx-auto">Italic</p>
            </div>
            <div id="${id}-linkSelect" class="sc-px-2 sc-py-sm sc-flex sc-items-center sc-gap-2 sc-select-inActiveTab-border sc-cursor-pointer sc-rounded-r">
              <p class="sc-universal sc-font-size-12 sc-text-center sc-mx-auto">Link</p>
              <img src="https://i.ibb.co.com/jvHLfd8c/Group.png" class="sc-w-4 sc-h-4 sc-object-contain" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="sc-mt-5 sc-px-2">
        <p class="sc-font-size-11 sc-font-thin sc-universal sc-text-gray-300 sc-roboto">Style</p>
        <div class="sc-font-size-11 sc-text-gray-400 sc-mt-1" id="scDesc-${id}-allSelect"> 
         ${typoAllSelect(fontSizes, LetterSpacing)}

       </div>
        <div class="sc-font-size-11 sc-text-gray-400 sc-mt-1 sc-hidden" id="scDesc-${id}-boldSelect">
         ${typoBoldSelect(fontSizes, LetterSpacing)}

      </div>
        <div class="sc-font-size-11 sc-text-gray-400 sc-mt-1 sc-hidden" id="scDesc-${id}-italicSelect"> 
         ${typoItalicSelect(fontSizes, LetterSpacing)}

        </div>
        <div class="sc-font-size-11 sc-text-gray-400 sc-mt-1 sc-hidden" id="scDesc-${id}-linkSelect">
         ${typoLinkSelect(fontSizes, LetterSpacing)}

        </div>
      </div>
    </div>
    <div class="sc-px-2">
      <div class="sc-h-1px sc-mt-4 sc-bg-3f3f3f"></div>
    </div>
  `;
}
