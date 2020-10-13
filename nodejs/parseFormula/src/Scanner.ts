// namespace byh {
    /**
     *  
     * 语法解析
     * made by cyj
     * create on 2020-09-22 09:35:55 
    */
    export class Scanner {
        private startPos:number = 0;
        private pos:number = 0;
        private tokenPos:number = 0;
        private token: SyntaxKind = SyntaxKind.Unknown;
        private end:number = 0;
        private text:string = "";

        constructor()
        {
        }

        public setText(text:string)
        {
            let s = this;
            s.text = text;
            s.end = text?text.length:0;
            s.startPos = 0;
            s.pos = 0;
        }


        public scan()
        {
            let s = this;
            s.startPos = s.pos;
            while(true)
            {
                s.tokenPos = s.pos;
                if(s.pos>=s.end)
                {
                    return s.token = SyntaxKind.EndOfFileToken;
                }
                let ch = s.text.charCodeAt(s.pos);
                switch(ch)
                {
                    case CharacterCodes.T:
                        if(s.text.charCodeAt(s.pos+1) == CharacterCodes.openParen)// ( 是一个公式
                        {
                            s.pos += 2;
                            while(s.pos<s.end)
                            {
                                const char = s.text.charCodeAt(s.pos);
                                s.pos++;
                                if(char == CharacterCodes.closeParen)
                                {
                                    break;
                                }
                            }
                            return s.token = SyntaxKind.FormulaObjToken;
                        }
                        s.pos++;
                    break;
                    case CharacterCodes._0:
                    case CharacterCodes._1:
                    case CharacterCodes._2:
                    case CharacterCodes._3:
                    case CharacterCodes._4:
                    case CharacterCodes._5:
                    case CharacterCodes._6:
                    case CharacterCodes._7:
                    case CharacterCodes._8:
                    case CharacterCodes._9:
                        while(s.pos<s.end)
                        {
                            const char = s.text.charCodeAt(s.pos);
                            if(char != CharacterCodes.dot && !s.isDigit(char))
                            {
                                break;
                            }
                            s.pos++;
                        }
                        return s.token = SyntaxKind.NumberToken;
                    case CharacterCodes.$:
                        s.pos += 1;
                        while(s.pos<s.end)
                        {
                            const char = s.text.charCodeAt(s.pos);
                            s.pos++;
                            if(char == CharacterCodes.$)
                            {
                                break;
                            }
                        }
                        return s.token = SyntaxKind.FormulaParamToken;
                    case CharacterCodes.dot://.点
                        if(s.isDigit(s.text.charCodeAt(s.pos+1)))
                        {
                            s.pos += 1;
                            while(s.pos<s.end)
                            {
                                const char = s.text.charCodeAt(s.pos);
                                s.pos++;
                                if(!s.isDigit(ch))
                                {
                                    break;
                                }
                            }
                            return s.token = SyntaxKind.NumberToken;
                        }
                        s.pos++;
                        return s.token = SyntaxKind.DotToken;
                    case CharacterCodes.openParen:
                        s.pos++;
                        return s.token = SyntaxKind.OpenParenToken;
                    case CharacterCodes.closeParen:
                        s.pos++;
                        return s.token = SyntaxKind.CloseParenToken;
                    case CharacterCodes.plus:
                        // if (s.text.charCodeAt(s.pos + 1) === CharacterCodes.plus) {
                        //     return s.pos += 2, s.token = SyntaxKind.PlusPlusToken;
                        // }
                        // if (s.text.charCodeAt(s.pos + 1) === CharacterCodes.equals) {
                        //     return s.pos += 2, s.token = SyntaxKind.PlusEqualsToken;
                        // }
                        s.pos++;
                        return s.token = SyntaxKind.PlusToken;
                    case CharacterCodes.minus:
                        // if (s.text.charCodeAt(s.pos + 1) === CharacterCodes.minus) {
                        //     return s.pos += 2, s.token = SyntaxKind.MinusMinusToken;
                        // }
                        // if (s.text.charCodeAt(s.pos + 1) === CharacterCodes.equals) {
                        //     return s.pos += 2, s.token = SyntaxKind.MinusEqualsToken;
                        // }
                        s.pos++;
                        return s.token = SyntaxKind.MinusToken;
                        
                    case CharacterCodes.asterisk:
                        s.pos++;
                        return s.token = SyntaxKind.AsteriskToken;
                    case CharacterCodes.comma:
                        s.pos++;
                        return s.token = SyntaxKind.CommaToken;
                    case CharacterCodes.slash:
                        s.pos++;
                        return s.token = SyntaxKind.SlashToken;
                    default:
                        if (s.isIdentifierStart(ch)) {
                            s.pos ++;
                            while (s.pos < s.end && s.isIdentifierPart(ch = s.text.charCodeAt(s.pos))) s.pos ++;
                            return s.token = SyntaxKind.Identifier;
                        }
                        else if (s.isWhiteSpaceSingleLine(ch)) {
                            s.pos ++;
                            continue;
                        }
                        else if (s.isLineBreak(ch)) {
                            s.pos ++;
                            continue;
                        }
                        s.pos ++;
                        return s.token = SyntaxKind.Unknown;
                    break;

                }

            }
        }

        private oldPos:number = 0;
        private oldStartPos:number = 0;
        private oldTokenPos:number = 0;
        private oldToken:SyntaxKind;
        /**预览下一个节点的类型 */
        public nextToken():SyntaxKind
        {
            let s= this;
            s.oldPos = s.pos;
            s.oldStartPos = s.startPos;
            s.oldTokenPos = s.tokenPos;
            s.oldToken = s.token;
            s.scan();
            let nextToken = s.getToken();
            s.pos = s.oldPos;
            s.startPos = s.oldStartPos;
            s.tokenPos = s.oldTokenPos;
            s.token = s.oldToken;
            return nextToken;
        }

        public getToken():SyntaxKind
        {
            return this.token;
        }

        public getTextPos():number
        {
            return this.pos;
        }

        public getStartPos():number
        {
            return this.startPos;
        }

        public getTokenText(){
            let s = this;
            if(!s.text)return ;
            return s.text.substring(s.tokenPos, s.pos);
        } 

        public getText()
        {
            return this.text;
        }



        private isDigit(ch: number): boolean {
            return ch >= CharacterCodes._0 && ch <= CharacterCodes._9;
        }

        private isIdentifierStart(ch: number): boolean {
            return ch >= CharacterCodes.A && ch <= CharacterCodes.Z || ch >= CharacterCodes.a && ch <= CharacterCodes.z ||
                ch === CharacterCodes.$ || ch === CharacterCodes._;
        }

        private isIdentifierPart(ch: number): boolean {
            return ch >= CharacterCodes.A && ch <= CharacterCodes.Z || ch >= CharacterCodes.a && ch <= CharacterCodes.z ||
                ch >= CharacterCodes._0 && ch <= CharacterCodes._9 || ch === CharacterCodes.$ || ch === CharacterCodes._ ;
        }

        private isWhiteSpaceSingleLine(ch: number): boolean {
            // Note: nextLine is in the Zs space, and should be considered to be a whitespace.
            // It is explicitly not a line-break as it isn't in the exact set specified by EcmaScript.
            return ch === CharacterCodes.space ||
                ch === CharacterCodes.tab ||
                ch === CharacterCodes.verticalTab ||
                ch === CharacterCodes.formFeed ||
                ch === CharacterCodes.nonBreakingSpace ||
                ch === CharacterCodes.nextLine ||
                ch === CharacterCodes.ogham ||
                ch >= CharacterCodes.enQuad && ch <= CharacterCodes.zeroWidthSpace ||
                ch === CharacterCodes.narrowNoBreakSpace ||
                ch === CharacterCodes.mathematicalSpace ||
                ch === CharacterCodes.ideographicSpace ||
                ch === CharacterCodes.byteOrderMark;
        }
        private isLineBreak(ch: number): boolean {
            // ES5 7.3:
            // The ECMAScript line terminator characters are listed in Table 3.
            //     Table 3: Line Terminator Characters
            //     Code Unit Value     Name                    Formal Name
            //     \u000A              Line Feed               <LF>
            //     \u000D              Carriage Return         <CR>
            //     \u2028              Line separator          <LS>
            //     \u2029              Paragraph separator     <PS>
            // Only the characters in Table 3 are treated as line terminators. Other new line or line
            // breaking characters are treated as white space but not as line terminators.
    
            return ch === CharacterCodes.lineFeed ||
                ch === CharacterCodes.carriageReturn ||
                ch === CharacterCodes.lineSeparator ||
                ch === CharacterCodes.paragraphSeparator;
        }

    }


    //////常量
    /**当前字符的token */
    export const enum SyntaxKind {
        /**未知标志 */
        Unknown,
        /**结束标志 */
        EndOfFileToken,
        /**公式方法的对象 如T(Math) */
        FormulaObjToken,
        /**公式的参数对象 如：$LEVEL$ */
        FormulaParamToken,
        /**数字 */
        NumberToken,
        /***.点 */
        DotToken,
        /**左括号 */
        OpenParenToken,
        /**右括号 */
        CloseParenToken,
        /**  ++ 连加 */
        // PlusPlusToken,
        // /*** +=  */
        // PlusEqualsToken,
        /**加号 + */
        PlusToken,
        /**-- */
        // MinusMinusToken,
        // /** -= */
        // MinusEqualsToken,
        /**减号 -  */
        MinusToken,
        /**乘号 */
        AsteriskToken,
        /**除号 */
        SlashToken,
        /**标识符 */
        Identifier,
        /**逗点 , */
        CommaToken,
    }
    /* @internal */
    export const enum CharacterCodes {
        _ = 0x5F,
        $ = 0x24,

        _0 = 0x30,
        _1 = 0x31,
        _2 = 0x32,
        _3 = 0x33,
        _4 = 0x34,
        _5 = 0x35,
        _6 = 0x36,
        _7 = 0x37,
        _8 = 0x38,
        _9 = 0x39,

        a = 0x61,
        b = 0x62,
        c = 0x63,
        d = 0x64,
        e = 0x65,
        f = 0x66,
        g = 0x67,
        h = 0x68,
        i = 0x69,
        j = 0x6A,
        k = 0x6B,
        l = 0x6C,
        m = 0x6D,
        n = 0x6E,
        o = 0x6F,
        p = 0x70,
        q = 0x71,
        r = 0x72,
        s = 0x73,
        t = 0x74,
        u = 0x75,
        v = 0x76,
        w = 0x77,
        x = 0x78,
        y = 0x79,
        z = 0x7A,

        A = 0x41,
        B = 0x42,
        C = 0x43,
        D = 0x44,
        E = 0x45,
        F = 0x46,
        G = 0x47,
        H = 0x48,
        I = 0x49,
        J = 0x4A,
        K = 0x4B,
        L = 0x4C,
        M = 0x4D,
        N = 0x4E,
        O = 0x4F,
        P = 0x50,
        Q = 0x51,
        R = 0x52,
        S = 0x53,
        T = 0x54,
        U = 0x55,
        V = 0x56,
        W = 0x57,
        X = 0x58,
        Y = 0x59,
        Z = 0x5a,

        ampersand = 0x26,             // &
        asterisk = 0x2A,              // *
        at = 0x40,                    // @
        backslash = 0x5C,             // \
        backtick = 0x60,              // `
        bar = 0x7C,                   // |
        caret = 0x5E,                 // ^
        closeBrace = 0x7D,            // }
        closeBracket = 0x5D,          // ]
        closeParen = 0x29,            // )
        colon = 0x3A,                 // :
        comma = 0x2C,                 // ,
        dot = 0x2E,                   // .
        doubleQuote = 0x22,           // "
        equals = 0x3D,                // =
        exclamation = 0x21,           // !
        greaterThan = 0x3E,           // >
        hash = 0x23,                  // #
        lessThan = 0x3C,              // <
        minus = 0x2D,                 // -
        openBrace = 0x7B,             // {
        openBracket = 0x5B,           // [
        openParen = 0x28,             // (
        percent = 0x25,               // %
        plus = 0x2B,                  // +
        question = 0x3F,              // ?
        semicolon = 0x3B,             // ;
        singleQuote = 0x27,           // '
        slash = 0x2F,                 // /
        tilde = 0x7E,                 // ~

        backspace = 0x08,             // \b
        formFeed = 0x0C,              // \f
        byteOrderMark = 0xFEFF,
        tab = 0x09,                   // \t
        verticalTab = 0x0B,           // \v

        lineFeed = 0x0A,              // \n
        carriageReturn = 0x0D,        // \r
        lineSeparator = 0x2028,
        paragraphSeparator = 0x2029,
        nextLine = 0x0085,
        // Unicode 3.0 space characters
        space = 0x0020,   // " "
        nonBreakingSpace = 0x00A0,   //
        enQuad = 0x2000,
        emQuad = 0x2001,
        enSpace = 0x2002,
        emSpace = 0x2003,
        threePerEmSpace = 0x2004,
        fourPerEmSpace = 0x2005,
        sixPerEmSpace = 0x2006,
        figureSpace = 0x2007,
        punctuationSpace = 0x2008,
        thinSpace = 0x2009,
        hairSpace = 0x200A,
        zeroWidthSpace = 0x200B,
        narrowNoBreakSpace = 0x202F,
        ideographicSpace = 0x3000,
        mathematicalSpace = 0x205F,
        ogham = 0x1680,
    }
// }

