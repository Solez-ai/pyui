import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class TodoList extends TkinterWidgetBase{

    static widgetType = "todo_list"
    static displayName = "Todo List"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            size: { width: 220, height: 160 },
            widgetName: "Todo list",
            attrs: {
                ...this.state.attrs,
                placeholder: {
                    label: "Placeholder",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "placeholder", maxLength: 100},
                    value: "Add a task...",
                    onChange: (value) => this.setAttrValue("placeholder", value)
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
            `def ${variableName}_add_task():`,
            `    task = ${variableName}_entry.get()`,
            `    if task:`,
            `        ${variableName}_listbox.insert(tk.END, task)`,
            `        ${variableName}_entry.delete(0, tk.END)`,
            "",
            `def ${variableName}_remove_task():`,
            `    selected = ${variableName}_listbox.curselection()`,
            `    if selected:`,
            `        ${variableName}_listbox.delete(selected[0])`,
            "",
            `${variableName}_entry = tk.Entry(master=${parent})`,
            `${variableName}_entry.insert(0, "${this.getAttrValue("placeholder")}")`,
            `${variableName}_entry.config(${config})`,
            `${variableName}_add_btn = tk.Button(master=${parent}, text="Add", command=${variableName}_add_task)`,
            `${variableName}_listbox = tk.Listbox(master=${parent}, height=6)`,
            `${variableName}_remove_btn = tk.Button(master=${parent}, text="Remove selected", command=${variableName}_remove_task)`,
            `${variableName}_entry.pack(fill=tk.X, pady=(0, 4))`,
            `${variableName}_add_btn.pack(fill=tk.X, pady=(0, 4))`,
            `${variableName}_listbox.pack(fill=tk.BOTH, expand=True, pady=(0, 4))`,
            `${variableName}_remove_btn.pack(fill=tk.X)`,
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
            <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-1 tw-overflow-hidden"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className="tw-text-xs tw-text-gray-400 tw-border tw-border-solid tw-border-gray-300 tw-rounded-sm tw-px-2 tw-py-1">
                    {this.getAttrValue("placeholder")}
                </div>
                <div className="tw-text-center tw-text-xs tw-bg-blue-100 tw-border tw-border-solid tw-border-blue-300 tw-rounded-sm tw-py-[2px]">Add</div>
                <div className="tw-flex-1 tw-border tw-border-solid tw-border-gray-300 tw-rounded-sm tw-p-1 tw-text-xs tw-text-gray-600 tw-content-start">
                    <div>☐ Example task</div>
                    <div>☐ Learn tkinter</div>
                </div>
                <div className="tw-text-center tw-text-xs tw-bg-gray-200 tw-border tw-border-solid tw-border-gray-300 tw-rounded-sm tw-py-[2px]">Remove selected</div>
            </div>
        )
    }

}


export default TodoList
