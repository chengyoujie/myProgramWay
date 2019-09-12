namespace eui{
    export interface Component{dataSource:any;}
    export interface Label{dataSource:any;}
    export interface DataGroup{dataSource:any;}
    export interface BitmapLabel{dataSource:any;}
    export interface EditableText{dataSource:any;}
    export interface Image{dataSource:any;}

    const DATA_SOURCE_KEY = "$DATA_SOURCE_KEY";

    //特殊处理类型
    createDataSourceDef(Component, getFlaseSetData);//Component 不设置属性，直接查找子对象的dataSource属性
    createDataSourceDef(List, getListSetData);//List 默认设置其setDataArr方法  数据为数组的时候 data instanceof Array
    createDataSourceDef(DataGroup, getDataGroupSetData);//DataGroup 默认设置其dataProvider属性   数据为数据集的时候 data instanceof ArrayCollection
    createDataSourceDef(Rect, getRectSetData);//Rect 默认设置x,y,width,height  当数据类型为字符串并且含有`,`分割的时候 如："x,y,w,h";
    //字符串类型
    createDataSourceDef(Button, getCommonSetData("label"));//Button 默认设置其label属性  当数据类型为： string,number,boolean
    createDataSourceDef(Label, getCommonSetData("text"));//Label 默认设置其text属性  当数据类型为： string,number,boolean
    createDataSourceDef(BitmapLabel, getCommonSetData("text"));//BitmapLabel 默认设置其text属性  当数据类型为： string,number,boolean
    createDataSourceDef(TextInput, getCommonSetData("text"));//TextInput 默认设置其text属性  当数据类型为： string,number,boolean
    createDataSourceDef(EditableText, getCommonSetData("text"));//EditableText 默认设置其text属性  当数据类型为： string,number,boolean
    createDataSourceDef(Image, getCommonSetData("source"));//Image 默认设置其source属性  当数据类型为： string,number,boolean
    //数字类型
    createDataSourceDef(HSlider, getNumberSetData("value"));//HSlider 默认设置其value属性  当数据类型为： string,number,boolean(true:1, false:0)
    createDataSourceDef(ProgressBar, getNumberSetData("value"));//ProgressBar 默认设置其value属性  当数据类型为： string,number,boolean(true:1, false:0)
    createDataSourceDef(VSlider, getNumberSetData("value"));//VSlider 默认设置其value属性  当数据类型为： string,number,boolean(true:1, false:0)
    createDataSourceDef(TabBar, getNumberSetData("selectedIndex"));//TabBar 默认设置其selectedIndex属性  当数据类型为： string,number,boolean(true:1, false:0)
    //boolean类型
    createDataSourceDef(RadioButton, getBooleanSetData("selected"));//RadioButton 默认设置其selected属性  当数据类型为： string等于为'true',number不等于0,boolean
    createDataSourceDef(CheckBox, getBooleanSetData("selected"));//CheckBox 默认设置其selected属性  当数据类型为： string等于为'true',number不等于0,boolean
    createDataSourceDef(ToggleButton, getBooleanSetData("selected"));//ToggleButton 默认设置其selected属性  当数据类型为： string等于为'true',number不等于0,boolean
    createDataSourceDef(ToggleSwitch, getBooleanSetData("selected"));//ToggleSwitch 默认设置其selected属性  当数据类型为： string等于为'true',number不等于0,boolean

    function getFlaseSetData(that, data)
    {
        return false;
    }
    function getListSetData(that, data)
    {
        let type = typeof data;
        if(type == "object")
        {
            if(data instanceof Array)
            {
                that.setDataArr(data);
                return true;
            }
        }
        return false;
    }
    function getDataGroupSetData(that, data)
    {
        let type = typeof data;
        if(type == "object")
        {
            if(data instanceof ArrayCollection)
            {
                that.dataProvider = data;
                return true;
            }
        }
        return false;
    }

    function getRectSetData(that, data)
    {
        let type = typeof data;
        if(type == "string" && data.indexOf(",") != -1)
        {
            let arr = data.split(",");
            arr.length = 4;
            that.x = arr[0]||0;
            that.y = arr[1]||0;
            that.width = arr[2]||0;
            that.height = arr[3]||0;
            return true;
        }
        return false;
    }

    function getCommonSetData(defaultProp:string, types:Array<string>=["string", "number", "boolean"])
    {
        return function(that, data){
            let type = typeof data;
            if(types.indexOf(type) != -1)
            {
                 that[defaultProp] = data;
                return true;
            }else{
                return false;
            }
        }
    }

    function getBooleanSetData(defaultProp:string)
    {
        return function(that, data)
        {
            let type = typeof data;
            if(type == "boolean")
            {
                that[defaultProp] = data;
                return true;
            }else if(type == 'string')
            {
                that[defaultProp] = (data == "true");
                return true;
            }else if(type == "number")
            {
                that[defaultProp] = (data != 0);
                return true;
            }else{
                return false;
            }
        }
    }

    function getNumberSetData(defaultProp:string)
    {
        return function(that, data)
        {
            let type = typeof data;
            if(type == "boolean")
            {
                that[defaultProp] = data==true?0:1;
                return true;
            }else if(type == 'string')
            {
                that[defaultProp] = +data;
                return true;
            }else if(type == "number")
            {
                that[defaultProp] = data;
                return true;
            }else{
                return false;
            }
        }
    }

    function createDataSourceDef(Type:any, setFun:(that, data)=>boolean)
    {
        let buttonProp = Type.prototype;
        Object.defineProperty(buttonProp,"dataSource", {
            set:function(this, data:any){
                this[DATA_SOURCE_KEY] = data;
                if(!setFun(this, data))
                {
                    if(typeof data == 'object')
                    {
                        for (let prop in data) {
                            if(prop in this){
                                if(this[prop]!=undefined && "dataSource" in this[prop])
                                    this[prop].dataSource = data[prop];
                                else
                                    this[prop] = data[prop];
                            }
                        }
                    }
                }
            },
            get:function(){
                return this[DATA_SOURCE_KEY];
            },
            enumerable:true,
            configurable:true
        });
    }

}