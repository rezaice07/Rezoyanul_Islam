
export class AppConstants {
    /**event keys */
    public static readonly EVENT_TOKEN_CHANGED = 'token:changed';
    public static readonly EVENT_CURRENT_LOGGED_IN_USER_CHANGED = 'currentLoggedInUserChanged:changed';

    public static readonly BASE_API_URL = 'http://localhost:57144/api';
    public static readonly BASE_URL = 'http://localhost:57144';

    public static readonly PROFILE_IMAGE = 'assets/img/profile/';

    public static readonly LOGIN_RESPONSE = 'LOGINRESPONSE';
    public static readonly AUTHENTICATION_TOKEN = 'AUTHENTICATIONTOKEN';
    public static readonly CURRENT_LOGGED_IN_USERKEY = 'CURRENTLOGGEDINUSERKEY';
}

export class ToastTypeConstants {
    public static readonly Success = 'success';
    public static readonly Warning = 'warning';
    public static readonly Danger = 'danger';
}

export class AppPageConstants {
    public static readonly Signout = 'signout';
}
