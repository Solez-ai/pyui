import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { CustomTkWidgetBase } from "./base"


class MenuBar extends CustomTkWidgetBase{

    static widgetType = "menu_bar"
    static displayName = "Menu Bar"

    constructor(props) {
        super(props)

        this.minSize = {width: 30, height: 20}

        this.state = {
            ...this.state,
            size: { width: 200, height: 25 },
            widgetName: "Menu bar",
            attrs: {
                ...this.state.attrs,
                menuItems: {
                    label: "Menu items (comma separated)",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "File, Edit, Help", maxLength: 200},
                    value: "File, Edit, Help",
                    onChange: (value) => this.setAttrValue("menuItems", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#E4E2E2")
    }

    getConfigCode(){
        const config = {}
        return config
    }

    generateCode(variableName, parent){

        const items = (this.getAttrValue("menuItems") || "").split(",").map(item => item.trim()).filter(Boolean)

        const code = [
            `${variableName} = tk.Menu(master=${parent})`,
        ]

        items.forEach((item, index) => {
            code.push(`${variableName}_menu_${index} = tk.Menu(${variableName}, tearoff=0)`)
            code.push(`${variableName}_menu_${index}.add_command(label="New", command=lambda: None)`)
            code.push(`${variableName}.add_cascade(label="${item}", menu=${variableName}_menu_${index})`)
        })

        code.push(`${parent}.config(menu=${variableName})`)

        return code
    }

    getImports(){
        const imports = super.getImports()
        imports.push("import tkinter as tk")
        return imports
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
        const items = (this.getAttrValue("menuItems") || "").split(",").map(item => item.trim()).filter(Boolean)

        return (
            <div className="tw-w-full tw-h-full tw-flex tw-place-items-center"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className="tw-w-full tw-h-full tw-bg-gray-200 tw-flex tw-place-items-center tw-gap-1 tw-px-2 tw-overflow-hidden">
                    {
                        items.map((item, index) => (
                            <span key={index}
                                className="tw-px-2 tw-py-[1px] tw-text-[11px] tw-text-gray-700 tw-cursor-default hover:tw-bg-blue-200">
                                {item}
                            </span>
                        ))
                    }
                </div>
            </div>
        )
    }

}


export default MenuBar
