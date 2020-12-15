export class LoginResponse {
    constructor(
    public isSuccess:any,
    public message: any,
    public token:any, 
    public access_token:any,
    public userId:any,
    public CanManageUser:any,
    ){    
    }    
}

export class RoleBaseAccessPermission {
    constructor(
        public AccessModule:any,
        public CanViewList:any,
        public CanViewDetails:any,
        public CanAddNew:any,
        public CanEdit:any,
        public CanDelete:any,
    ){    
    }    
}

export class ApiLoginResponse {
    constructor(
    public access_token:any,
    ){    
    }    
}