import { Configuration, LogLevel } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: "00000000-0000-0000-0000-000000000000", 
        authority: "https://login.microsoftonline.com/common",
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage",
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) return;
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        return;
                    case LogLevel.Verbose:
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

export const isAuthRealEnabled = msalConfig.auth.clientId !== "00000000-0000-0000-0000-000000000000";

export const loginRequest = {
    scopes: ["User.Read"]
};