export function findIds(){
    function logAllCollections() {
        document.querySelectorAll('[id^="collection-"]').forEach(element => {
            console.log('📌 Collection Found:', element.id);
        });
    }
    
    function sectionAndId(event) {
        const block = event.target.closest('[id^="block-"]');
        if (block) {
            console.log('🟠 Block clicked:', block.id);
            return;
        }
    
        const section = event.target.closest('section[data-section-id]');
        if (section) {
            console.log('🔵 Section clicked:', section.getAttribute('data-section-id'));
        }
    }
    
    function logPageId() {
        const pageElement = document.querySelector('article[data-page-sections]');
        if (pageElement) {
            console.log('📄 Page ID:', pageElement.getAttribute('data-page-sections'));
        }
    }
    
    function initializeLogging() {
        logAllCollections();
        logPageId();
        document.addEventListener('click', sectionAndId);
    }

    initializeLogging();
    
}