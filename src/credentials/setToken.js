window.setToken = async function () {
    return new Promise((resolve) => {
        const widgetScript = document.getElementById("squareCraft-script");
        if (!widgetScript) {
            console.error("❌ Widget script not found! Ensure the script tag exists with id 'squareCraft-script'.");
            resolve({});
            return;
        }

        let token = widgetScript.dataset?.token;
        let squareCraft_u_id = widgetScript.dataset?.uId;
        let squareCraft_w_id = widgetScript.dataset?.wId;

        if (token) {
            localStorage.setItem("squareCraft_auth_token", token);
            document.cookie = `squareCraft_auth_token=${token}; path=/; domain=${location.hostname}; Secure; SameSite=Lax`;
        }

        if (squareCraft_u_id) {
            localStorage.setItem("squareCraft_u_id", squareCraft_u_id);
            document.cookie = `squareCraft_u_id=${squareCraft_u_id}; path=.squarespace.com;`;
        }

        if (squareCraft_w_id) {
            localStorage.setItem("squareCraft_w_id", squareCraft_w_id);
            document.cookie = `squareCraft_w_id=${squareCraft_w_id}; path=.squarespace.com;`;
        }

        resolve({ token, squareCraft_u_id, squareCraft_w_id });
    });
};
