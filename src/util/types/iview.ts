import Vue from "vue";
export default interface  iviewtype extends Vue{
    $Loading: {
        start: ()=>void;
        update: (percent:any)=>void;
        finish: ()=>void;
        error: ()=>void;
        config: (options:{
            color: any,
            failedColor: any,
            height: any
        })=>void;
        destroy: ()=>void;
    };
    $Message: {
        name: string;
        info:(options:any)=>any;
        success: (options:any)=>any;
        warning: (options:any)=>any;
        error: (options:any)=>any;
        loading: (options:any)=>any;
        config: (options:any)=>void;
        destroy: (options:any)=>void;
    };
    $Modal: {
        info: (props:any)=>any;
        success: (props:any)=>any;
        warning: (props:any)=>any;
        error: (props:any)=>any;
        confirm: (props:any)=>any;
        remove: (props:any)=>any;
    };
    $Notice: {
        open: (options:any)=>any;
        info: (options:any)=>any;
        success: (options:any)=>any;
        warning: (options:any)=>any;
        error: (options:any)=>any;
        config: (options:any)=>void;
        close: (name:any)=>any;
        destroy: ()=>void;
    }
}