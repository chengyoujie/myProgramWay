
/**Eui中id变量信息 */
interface IdInfo{
    /**变量名字 */
	name:string;
    /**变量模块名 */
	module:string;
    /**变量类名 */
	clsName:string;
}

/**
 * Eui文件的基本信息
 */
interface EUIInfo{
    /**文件路径 */
    path:string;
    /**文件内容 */
    content:string;

    /** 基本解析后的数据内容 */

    /**eui文件中的所有id的信息 IdInfo[]*/
    ids:IdInfo[];
    /**当前 exml文件的目录 */
    parentDir:string;
    /**当前 exml的文件名 不包含文件的后缀*/
    fileName:string;
    /** 导出类的基本名字  一般用于生成对应功能的类 ` 如${baseClsName}View  ${baseClsName}Mediator` */
    baseClsName:string;
}

///////////项目配置

/**项目配置信息 */
interface AppConfig{
    auth:string;
    defaultcreate:number;
    create:CreateInfo[];
    module:{[id:number]:ModuleInfo};
    moduleCodePath:string;
}
/**创建模板的信息 */
interface CreateInfo{
    /**文件名中包含的特殊字符串， 如果多个可以用 | 分开 */
    keyword:string;
    /**使用那些模板生成 多个可以用,分开 */
    usemodule:string;
}

/**每个具体模板的信息 */
interface ModuleInfo{
    /**模板的标识id */
    id:number;
    /**模板的名字  生成类名时 基础名字$baseClsName）加上name 作为类名  如要改动最好也检查下对应的模板文件（写死的）中*/
    name:string;
    /**模板文件名  在module/路径下 */
    file:string;
    /** 生成文件时 在对应模块文件下新建的文件夹名字*/
    outdir:string;
    /** 是否覆盖 true 每次生成都覆盖  false 如果有了就不生成了 */
    override:boolean;
    /**生成的文件后缀名 */
    fileType:string;
}
