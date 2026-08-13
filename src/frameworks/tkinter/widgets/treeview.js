import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class Treeview extends TkinterWidgetBase{

    static widgetType = "treeview"
    static displayName = "Treeview"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            size: { width: 200, height: 120 },
            widgetName: "Treeview",
            attrs: {
                ...this.state.attrs,
                columns: {
                    label: "Columns (comma separated)",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "Name, Age", maxLength: 200},
                    value: "Name, Age",
                    onChange: (value) => this.setAttrValue("columns", value)
                },
                showTree: {
                    label: "Show tree column",
                    tool: Tools.CHECK_BUTTON,
                    value: true,
                    onChange: (value) => this.setAttrValue("showTree", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff")
    }

    getConfigCode(){
        const config = {}
        return config
    }

    generateCode(variableName, parent){

        const columns = (this.getAttrValue("columns") || "").split(",").map(item => item.trim()).filter(Boolean)
        const showTree = this.getAttrValue("showTree")

        const columnsArr = columns.map((col, index) => `"col_${index + 1}"`)
        const show = showTree ? "tree headings" : "headings"

        const code = [
            `${variableName} = ttk.Treeview(master=${parent}, columns=(${columnsArr.join(", ") || "'#0'"}), show="${show}")`,
        ]

        columns.forEach((col, index) => {
            code.push(`${variableName}.heading("col_${index + 1}", text="${col}")`)
        })

        code.push(`${variableName}.insert("", "end", values=("${columns[0] || "Item"}", "${columns[1] || "Value"}"))`)
        code.push(`${variableName}.${this.getLayoutCode()}`)

        return code
    }

    getImports(){
        const imports = super.getImports()
        imports.push("from tkinter import ttk")
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
        const columns = (this.getAttrValue("columns") || "").split(",").map(item => item.trim()).filter(Boolean)

        return (
            <div className="tw-w-flex tw-flex-col tw-w-full tw-h-full tw-rounded-md tw-overflow-hidden">
                <div className="tw-p-1 tw-w-full tw-h-full tw-content-start tw-overflow-hidden"
                        ref={this.styleAreaRef}
                        style={this.getInnerRenderStyling()}>
                    <table className="tw-w-full tw-text-[11px] tw-border-collapse">
                        <thead>
                            <tr>
                                {this.getAttrValue("showTree") && <th className="tw-border tw-border-solid tw-border-gray-300 tw-px-1 tw-text-left">#</th>}
                                {columns.map((col, index) => (
                                    <th key={index} className="tw-border tw-border-solid tw-border-gray-300 tw-px-1 tw-text-left">{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {this.getAttrValue("showTree") && <td className="tw-border tw-border-solid tw-border-gray-300 tw-px-1">1</td>}
                                {columns.map((col, index) => (
                                    <td key={index} className="tw-border tw-border-solid tw-border-gray-300 tw-px-1">{index === 0 ? "Item" : "Value"}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}


export default Treeview
