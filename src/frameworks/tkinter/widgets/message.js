import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class Message extends TkinterWidgetBase{

    static widgetType = "message"
    static displayName = "Message"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            size: { width: 180, height: 60 },
            widgetName: "Message",
            attrs: {
                ...this.state.attrs,
                messageText: {
                    label: "Message",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "message", maxLength: 200},
                    value: "This is a message widget. It wraps text automatically.",
                    onChange: (value) => this.setAttrValue("messageText", value)
                },
                widthChars: {
                    label: "Width (chars)",
                    tool: Tools.NUMBER_INPUT,
                    toolProps: {min: 10, max: 200},
                    value: null,
                    onChange: (value) => this.setAttrValue("widthChars", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#E4E2E2")
    }

    generateCode(variableName, parent){

        const config = this.getConfigCode()

        const widthChars = this.getAttrValue("widthChars")
        if (widthChars){
            config["width"] = widthChars
        }

        return [
                `${variableName} = tk.Message(master=${parent}, text="${this.getAttrValue("messageText")}")`,
                `${variableName}.config(${convertObjectToKeyValueString(config)})`,
                `${variableName}.${this.getLayoutCode()}`
            ]
    }

    getToolbarAttrs(){
        const toolBarAttrs = super.getToolbarAttrs()

        return ({
            id: this.__id,
            widgetName: toolBarAttrs.widgetName,
            size: toolBarAttrs.size,
            ...this.state.attrs,
        })
    }

    renderContent(){
        return (
            <div className="tw-w-flex tw-flex-col tw-w-full tw-h-full tw-rounded-md tw-overflow-hidden">
                <div className="tw-p-2 tw-w-full tw-h-full tw-place-items-start tw-text-left tw-text-xs tw-content-start"
                        ref={this.styleAreaRef}
                        style={this.getInnerRenderStyling()}>
                    {this.getAttrValue("messageText")}
                </div>
            </div>
        )
    }

}


export default Message
