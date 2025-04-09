export function handleAlignmentClick(event, getTextType, applyStylesToElement, lastClickedElement, lastClickedBlockId, lastAppliedAlignment, lastActiveAlignmentElement, userId, token, widgetId) {
    const alignmentIcon = event.target.closest('#scTextAlignLeft, #scTextAlignCenter, #scTextAlignRight, #scTextAlignJustify');
    if (!alignmentIcon || !lastClickedElement) return { lastAppliedAlignment, lastActiveAlignmentElement };
  
    const textTags = lastClickedElement.querySelectorAll("h1, h2, h3, h4, p");
    textTags.forEach(el => {
      const tagName = el.tagName.toLowerCase();
      const result = getTextType(tagName, el);
      if (result) {
        console.log(`📘 getTextType → Tag: ${tagName.toUpperCase()}, Type: ${result.type}, BorderColor: ${result.borderColor}`);
      }
    });
  
    const textAlign = alignmentIcon.dataset.align;
  
    if (lastAppliedAlignment === textAlign) {
      applyStylesToElement(lastClickedElement, { "text-align": "" });
      lastAppliedAlignment = null;
      console.log(`❌ Alignment undone for Block: ${lastClickedBlockId}`);
  
      if (lastActiveAlignmentElement) {
        lastActiveAlignmentElement.classList.remove("sc-activeTab-border");
        lastActiveAlignmentElement.classList.add("sc-inActiveTab-border");
      }
    } else {
      applyStylesToElement(lastClickedElement, { "text-align": textAlign });
      lastAppliedAlignment = textAlign;
      console.log(`✅ Applying text alignment: ${textAlign} to Block: ${lastClickedBlockId}`);
  
      if (lastActiveAlignmentElement && lastActiveAlignmentElement !== alignmentIcon) {
        lastActiveAlignmentElement.classList.remove("sc-activeTab-border");
        lastActiveAlignmentElement.classList.add("sc-inActiveTab-border");
      }
  
      alignmentIcon.classList.add("sc-activeTab-border");
      alignmentIcon.classList.remove("sc-inActiveTab-border");
  
      lastActiveAlignmentElement = alignmentIcon;
    }
  
    document.getElementById("publish")?.addEventListener("click", async () => {
      const publishButton = document.getElementById("publish");
      publishButton.textContent = "Publishing...";
  
      const pageId = document.querySelector("article[data-page-sections]")?.getAttribute("data-page-sections");
      if (!lastClickedElement || !lastAppliedAlignment || !pageId) return;
  
      const modificationData = {
        userId,
        token,
        widgetId,
        modifications: [{
          pageId,
          elements: [{
            elementId: lastClickedElement.id,
            css: { "text-align": lastAppliedAlignment }
          }]
        }]
      };
  
      try {
        const response = await fetch("https://admin.squareplugin.com/api/v1/modifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token || localStorage.getItem("sc_auth_token")}`,
            "userId": userId,
            "pageId": pageId,
            "widget-id": widgetId,
          },
          body: JSON.stringify(modificationData)
        });
  
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        console.log("✅ Modifications saved successfully:", result);
        publishButton.textContent = "Published";
  
      } catch (error) {
        console.error("❌ Error saving modifications:", error.message);
        publishButton.textContent = "Failed";
      }
    });
  
    return { lastAppliedAlignment, lastActiveAlignmentElement };
  }
  