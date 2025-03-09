window.setToken = async function () {
    return new Promise((resolve) => {
        const widgetScript = document.getElementById("squarecraft-script");
        if (!widgetScript) {
            console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
            resolve({});
            return;
        }

        const token = widgetScript.dataset?.token;
        const squareCraft_u_id = widgetScript.dataset?.uId;
        const squareCraft_w_id = widgetScript.dataset?.wId;

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
