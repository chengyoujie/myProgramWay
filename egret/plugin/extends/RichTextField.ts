namespace chm {
    /**
     * 富文本
     * made by cyj
     * create on 2019-10-24 16:17:4 
    */
    export class RichTextField extends eui.Component{
        public static EMOJI_REG = /#([0-9]+)#/gi;
        public static BLOCK_STR = String.fromCharCode(12288);
        private _label:eui.Label;
        private _text:string;
        private _spriteContain:egret.Sprite;
        
        
        constructor()
        {
            super();
            
        }

        protected childrenCreated()
        {
            super.childrenCreated();
            let s = this;
            s._label = new eui.Label();
            s._spriteContain = new egret.Sprite();
            s._label.width = 200;
            s._label.height = 120;
            s._label.size = 20;
            this.addChild(s._label);
            s.addChild(s._spriteContain);
        }

        public set text(msg:string)
        {
            let s= this;
            if(s.text == msg)return;
            s._spriteContain.removeChildren();//后续放到回收池
            s._text = msg;
            if(!msg)
            {
                s._label.text = "";
                return;
            }
            let reg = RichTextField.EMOJI_REG;
            reg.lastIndex = 0;
            let arr = reg.exec(msg);
            if(!arr)
            {
                s._label.text = msg;
                return;
            }
            let tempStr = "";
            let index = 0;
            while(arr)
            {
                tempStr += msg.substring(index, reg.lastIndex-arr[0].length)
                index = reg.lastIndex;
                s._label.textFlow = HtmlUtil.getHtmlStr(tempStr);
                 let item = new ChatEmojiItemView({});
                item.setData(+arr[1]);
                tempStr += "<font size='50'>"+RichTextField.BLOCK_STR+"</font>";
                let lines = s._label.$getLinesArr();
                let line = lines[lines.length-1];
                if(line)
                {
                    item.x = line.width;
                    item.y = s.getLineY(s._label);
                }else{
                    item.x = 0;
                    item.y = s.getLineY(s._label);
                }
                s._spriteContain.addChild(item);
                arr = reg.exec(msg);
            }
            tempStr += msg.substr(index);
            s._label.textFlow = HtmlUtil.getHtmlStr(tempStr);
        }

        public get text()
        {
            return this._text;
        }

        /**获取当前文本的Y值 */
        private getLineY(label:eui.Label){
            let lines = label.$getLinesArr();
            let lineY = 0;
            let space = label.lineSpacing;
            for(let i=0; i<lines.length-1; i++)
            {
                lineY += lines[i].height + space; 
            }
            return lineY;
        }


    }

}