import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { CustomTkWidgetBase } from "./base"


class PasswordEntry extends CustomTkWidgetBase{

    static widgetType = "password_entry"
    static displayName = "Password Entry"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 25}

        this.state = {
            ...this.state,
            size: { width: 140, height: 35 },
            widgetName: "Password",
            attrs: {
                ...this.state.attrs,
                placeHolder: {
                    label: "Placeholder",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "password", maxLength: 100},
                    value: "Enter password",
                    onChange: (value) => this.setAttrValue("placeHolder", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff")
    }

    generateCode(variableName, parent){

        const config = convertObjectToKeyValueString(this.getConfigCode())

        return [
                `${variableName} = ctk.CTkEntry(master=${parent}, placeholder_text="${this.getAttrValue("placeHolder")}", show="*")`,
                `${variableName}.configure(${config})`,
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
                <div className="tw-p-2 tw-w-full tw-h-full tw-flex tw-place-items-center"
                        ref={this.styleAreaRef}
                        style={this.getInnerRenderStyling()}>
                    <div className="tw-text-sm tw-text-gray-300 tw-tracking-[4px]">
                        ••••••••
                    </div>
                </div>
            </div>
        )
    }

}


export default PasswordEntry
