import { useState } from "react"

import { Button, Input, Select } from "antd"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"

/**
 * Code editor for widget event handlers.
 *
 * Lets the user add events (click, change, hover, close window, etc.)
 * and write the Python code that should run when the event fires.
 * The written handlers are included in the exported Python code and
 * wired up to the widget automatically.
 *
 * @param {object} value - map of eventName -> python code, e.g. {click: "print('hi')"}
 * @param {string[]} supportedEvents - list of event names this widget supports
 * @param {function} onChange - callback with the new map
 */
export function EventHandlerEditor({ value = {}, supportedEvents = [], onChange }) {

    const [selectedEvent, setSelectedEvent] = useState(null)

    const availableEvents = (supportedEvents || []).filter(eventName => !(eventName in (value || {})))

    const addEvent = () => {
        if (!selectedEvent) return

        onChange({ ...(value || {}), [selectedEvent]: "" })
        setSelectedEvent(null)
    }

    const updateCode = (eventName, code) => {
        onChange({ ...(value || {}), [eventName]: code })
    }

    const removeEvent = (eventName) => {
        const newValue = { ...(value || {}) }
        delete newValue[eventName]
        onChange(newValue)
    }

    return (
        <div className="tw-flex tw-flex-col tw-gap-2">
            {
                Object.entries(value || {}).map(([eventName, code]) => (
                    <div key={eventName}
                        className="tw-flex tw-flex-col tw-gap-1 tw-border tw-border-solid tw-border-gray-300 tw-rounded-md tw-p-2">
                        <div className="tw-flex tw-place-items-center tw-justify-between tw-gap-2">
                            <span className="tw-text-sm tw-font-medium">{eventName}</span>
                            <Button type="text" danger size="small"
                                icon={<DeleteOutlined />}
                                onClick={() => removeEvent(eventName)} />
                        </div>
                        <Input.TextArea
                            value={code}
                            onChange={(e) => updateCode(eventName, e.target.value)}
                            placeholder={"# Python code for this handler, e.g.\n# print('clicked!')"}
                            autoSize={{ minRows: 2, maxRows: 10 }}
                            className="!tw-font-mono !tw-text-xs"
                        />
                    </div>
                ))
            }

            {
                availableEvents.length > 0 && (
                    <div className="tw-flex tw-gap-1 tw-place-items-center">
                        <Select
                            placeholder="Add event"
                            value={selectedEvent}
                            onChange={setSelectedEvent}
                            options={availableEvents.map(eventName => ({ value: eventName, label: eventName }))}
                            className="tw-flex-1"
                        />
                        <Button type="primary" size="small"
                            icon={<PlusOutlined />}
                            onClick={addEvent}>
                            Add
                        </Button>
                    </div>
                )
            }

            {
                (supportedEvents || []).length === 0 && (
                    <div className="tw-text-xs tw-text-gray-400">
                        No events supported for this widget.
                    </div>
                )
            }
        </div>
    )
}
