import { Router } from './modules/router/router.js'
import { ChatPage } from './pages/chat/chat.js';
import { LoginPage } from './pages/login/login.js';
import { EditPasswordPage } from './pages/profile/editPassword/editPassword.js';
import { ProfilePage } from './pages/profile/profile.js';
import { RegistrationPage } from './pages/registration/registration.js';

const router = new Router(".app");

router
    .use("/", LoginPage)
    .use("/profile", ProfilePage)
    .use("/editpassword", EditPasswordPage)
    .use("/registration", RegistrationPage)
    .use("/chat", ChatPage)
    .start();