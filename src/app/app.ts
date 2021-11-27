import {Router} from 'modules/router/router';
import {ChatPage} from 'pages/chat/chat';
import {ErrorPage} from 'pages/error/error';
import {LoginPage} from 'pages/login/login';
import {EditPasswordPage} from 'pages/profile/editPassword/editPassword';
import {ProfilePage} from 'pages/profile/profile';
import {RegistrationPage} from 'pages/registration/registration';
import '@/global.scss';

const router = new Router('.app');

router
    .use('/', LoginPage)
    .use('/profile', ProfilePage)
    .use('/editpassword', EditPasswordPage)
    .use('/registration', RegistrationPage)
    .use('/chats', ChatPage)
    .use('/notFound', ErrorPage)
    .start();
