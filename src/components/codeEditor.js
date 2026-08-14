import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { Button, Tooltip, message } from "antd"
import { CopyOutlined, CodeOutlined, PlayCircleOutlined, UndoOutlined } from "@ant-design/icons"

import FrameWorks from "../constants/frameworks"
import { useWidgetContext } from "../canvas/context/widgetContext"

import { getTkinterCodeString, generateTkinterWidgetCodeString } from "../frameworks/tkinter/engine/code"
import { getCustomTkCodeString, generateCustomTkWidgetCodeString } from "../frameworks/customtk/engine/code"

import { parsePythonToWidgetTree, buildWidgetTypeRegistry } from "../frameworks/utils/pythonParser"

// finds a widget node by id inside the widget tree, returns the node and its parent node
function findWidgetNodeAndParent(nodes, id, parent = null) {
    for (const node of nodes) {
        if (node.id === id) {
            return { node, parent }
        }
        if (node.children && node.children.length > 0) {
            const found = findWidgetNodeAndParent(node.children, id, node)
            if (found) {
                return found
            }
        }
    }
    return null
}

// very small python highlighter for read-only display
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function highlightPython(code) {
    const escaped = escapeHtml(code)

    const keywords = /\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|lambda|True|False|None|pass|break|continue|try|except|finally|with|as|is|global|nonlocal|print)\b/g

    // tokenize by strings first so keywords inside strings are not highlighted
    let result = ""
    let lastIndex = 0
    const stringRegex = /("[^"\n]*"|'[^'\n]*')|(#[^\n]*)/g

    let match
    while ((match = stringRegex.exec(escaped)) !== null) {
        const before = escaped.slice(lastIndex, match.index)
        result += before.replace(keywords, '<span style="color:#c586c0">$1</span>')
            .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#b5cea8">$1</span>')

        if (match[1]) {
            result += `<span style="color:#ce9178">${match[1]}</span>`
        } else if (match[2]) {
            result += `<span style="color:#6a9955">${match[2]}</span>`
        }
        lastIndex = stringRegex.lastIndex
    }

    result += escaped.slice(lastIndex).replace(keywords, '<span style="color:#c586c0">$1</span>')
        .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#b5cea8">$1</span>')

    return result
}


function CodeEditor({ framework, canvasRef, sidebarWidgets }) {

    const { widgets, widgetRefs, activeWidget } = useWidgetContext()

    const [copied, setCopied] = useState(false)
    const copyTimerRef = useRef(null)

    const [tab, setTab] = useState("view")

    // editable draft of the full project code (edit tab)
    const [draftCode, setDraftCode] = useState("")

    // track selection so the panel title can update
    const [selectedName, setSelectedName] = useState("")

    useEffect(() => {
        if (activeWidget) {
            setSelectedName(activeWidget.getDisplayName?.() || activeWidget.getWidgetName?.() || "")
        } else {
            setSelectedName("")
        }
    }, [activeWidget])

    useEffect(() => {
        return () => clearTimeout(copyTimerRef.current)
    }, [])

    const { code, isFullProject } = useMemo(() => {

        try {
            // if a widget is selected generate only its code
            if (activeWidget) {
                const found = findWidgetNodeAndParent(widgets, activeWidget.__id)

                if (!found) {
                    return { code: "# select a widget to see its live code", isFullProject: false }
                }

                const parentVar = found.parent
                    ? (widgetRefs.current[found.parent.id]?.current?.getVariableName?.() || "")
                    : ""

                const widgetCode = framework === FrameWorks.TKINTER
                    ? generateTkinterWidgetCodeString(found.node, widgetRefs.current, parentVar)
                    : generateCustomTkWidgetCodeString(found.node, widgetRefs.current, parentVar)

                return { code: widgetCode, isFullProject: false }
            }

            // no widget selected -> show the full project code
            const result = framework === FrameWorks.TKINTER
                ? getTkinterCodeString(widgets, widgetRefs.current, { silent: true })
                : getCustomTkCodeString(widgets, widgetRefs.current, { silent: true })

            if (!result) {
                return { code: "# Add a Main window widget to see the generated code", isFullProject: true }
            }

            return { code: result.code, isFullProject: true }

        } catch (error) {
            // never crash the whole app because of the live code panel
            console.error("Failed to generate live code:", error)
            return { code: `# Could not generate code yet\n# ${error?.message || "unknown error"}`, isFullProject: true }
        }

    }, [widgets, activeWidget, framework, widgetRefs])

    // keep the editable draft in sync when the generated code changes
    useEffect(() => {
        if (tab === "edit" && isFullProject) {
            setDraftCode(code)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, tab, isFullProject])

    const handleCopy = () => {
        if (!code) return

        navigator.clipboard?.writeText(code).then(() => {
            setCopied(true)
            clearTimeout(copyTimerRef.current)
            copyTimerRef.current = setTimeout(() => setCopied(false), 1500)
        }).catch(() => {
            message.error("Could not copy code")
        })
    }

    const handleApply = useCallback(() => {

        if (!draftCode.trim()) {
            message.warning("The code is empty")
            return
        }

        if (!canvasRef?.current) {
            message.error("Canvas is not ready yet")
            return
        }

        try {
            const parsed = parsePythonToWidgetTree(draftCode)

            if (!parsed.roots || parsed.roots.length === 0) {
                message.error("Could not find any widgets in the code. Make sure it contains a main window (tk.Tk()) and widget definitions.")
                return
            }

            const registry = buildWidgetTypeRegistry(sidebarWidgets || [])

            const applied = canvasRef.current.loadWidgetTree(parsed.roots, registry)

            if (applied) {
                message.success("Code applied to the canvas")
            }

        } catch (error) {
            console.error("Failed to apply code:", error)
            message.error(`Could not apply the code: ${error?.message || "unknown error"}`)
        }

    }, [draftCode, canvasRef, sidebarWidgets])

    const handleResetDraft = () => {
        setDraftCode(code)
    }

    const codeLines = useMemo(() => code.split("\n"), [code])

    const editorHeader = (
        <div className="tw-h-[50px] tw-shrink-0 tw-flex tw-place-items-center tw-gap-2 tw-px-3 tw-bg-[#252526] tw-border-b tw-border-solid tw-border-gray-700">
            <CodeOutlined className="tw-text-blue-400" />
            <div className="tw-flex tw-flex-col tw-leading-tight">
                <span className="tw-text-sm tw-text-gray-100 tw-font-medium">
                    {tab === "edit" ? "Edit Code" : (selectedName ? `Code · ${selectedName}` : "Live Code")}
                </span>
                <span className="tw-text-[11px] tw-text-gray-400">
                    {tab === "edit" ? "main.py · editable" : (isFullProject ? "main.py" : `${selectedName || "widget"} · python`)}
                </span>
            </div>
            {tab !== "edit" && (
                <Tooltip title={copied ? "Copied!" : "Copy code"}>
                    <Button size="small"
                        className="tw-ml-auto"
                        icon={<CopyOutlined />}
                        onClick={handleCopy}
                        type={copied ? "primary" : "default"}
                    >
                        {copied ? "Copied" : "Copy"}
                    </Button>
                </Tooltip>
            )}
            {tab === "edit" && (
                <>
                    <Tooltip title="Reset to generated code">
                        <Button size="small" className="tw-ml-auto" icon={<UndoOutlined />} onClick={handleResetDraft} />
                    </Tooltip>
                    <Button size="small" type="primary" icon={<PlayCircleOutlined />} onClick={handleApply}>
                        Apply
                    </Button>
                </>
            )}
        </div>
    )

    const editableArea = (
        <div className="tw-flex-1 tw-overflow-auto tw-bg-[#1e1e1e]">
            <textarea
                value={draftCode}
                onChange={(e) => setDraftCode(e.target.value)}
                spellCheck={false}
                className="tw-w-full tw-min-h-full tw-resize-none tw-outline-none tw-bg-transparent tw-text-gray-200 tw-text-[12.5px] tw-font-mono tw-leading-[1.5] tw-p-3 tw-border-0 tw-box-border"
                style={{ tabSize: 4 }}
            />
        </div>
    )

    const readOnlyArea = (
        <div className="tw-flex-1 tw-overflow-auto tw-p-0 tw-text-[12.5px] tw-font-mono tw-leading-[1.5]">
            {
                codeLines.map((line, index) => (
                    <div key={index} className="tw-flex tw-h-[19px]">
                        <span className="tw-w-[38px] tw-shrink-0 tw-text-right tw-pr-2 tw-select-none tw-text-gray-600">
                            {index + 1}
                        </span>
                        <pre
                            className="tw-m-0 tw-p-0 tw-whitespace-pre tw-text-gray-200"
                            dangerouslySetInnerHTML={{ __html: highlightPython(line) || " " }}
                        />
                    </div>
                ))
            }
        </div>
    )

    return (
        <div className="tw-w-[420px] tw-shrink-0 tw-h-full tw-flex tw-flex-col tw-border-l tw-border-solid tw-border-gray-200 tw-bg-[#1e1e1e]">
            {editorHeader}

            <div className="tw-shrink-0 tw-flex tw-border-b tw-border-solid tw-border-gray-700">
                <div className={`tw-flex-1 tw-text-center tw-text-xs tw-py-1 tw-cursor-pointer tw-select-none ${tab === "view" ? "tw-bg-[#1e1e1e] tw-text-blue-400 tw-border-b-2 tw-border-solid tw-border-blue-500" : "tw-bg-[#252526] tw-text-gray-400"}`}
                    onClick={() => setTab("view")}>
                    View
                </div>
                <div className={`tw-flex-1 tw-text-center tw-text-xs tw-py-1 tw-cursor-pointer tw-select-none ${tab === "edit" ? "tw-bg-[#1e1e1e] tw-text-blue-400 tw-border-b-2 tw-border-solid tw-border-blue-500" : "tw-bg-[#252526] tw-text-gray-400"}`}
                    onClick={() => setTab("edit")}>
                    Edit
                </div>
            </div>

            <div className="tw-flex-1 tw-overflow-hidden tw-flex tw-flex-col">
                {tab === "edit"
                    ? (isFullProject ? editableArea : (
                        <div className="tw-flex-1 tw-flex tw-place-items-center tw-place-content-center tw-text-xs tw-text-gray-500 tw-px-6 tw-text-center">
                            Deselect the selected widget to edit the full project code.
                        </div>
                    ))
                    : readOnlyArea
                }
            </div>

            {tab === "edit" && (
                <div className="tw-shrink-0 tw-px-3 tw-py-2 tw-bg-[#252526] tw-border-t tw-border-solid tw-border-gray-700 tw-text-[11px] tw-text-gray-400">
                    Edit the Python code and click <span className="tw-text-blue-400">Apply</span> to rebuild the canvas from it. Only widgets that map to a builder widget will be loaded.
                </div>
            )}
        </div>
    )
}


export default CodeEditor
