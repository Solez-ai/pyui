import { Select, Input, Button } from "antd"
import { DownloadOutlined, GithubFilled, LinkOutlined } from "@ant-design/icons"
import FrameWorks from "../constants/frameworks"


const items = [
    {
        value: FrameWorks.TKINTER,
        label: 'tkinter',
    },
    {
        value: FrameWorks.CUSTOMTK,
        label: 'customtk',
    },
]


function Header({projectName, onProjectNameChange, framework, onFrameworkChange,
                 onExportClick, className=''}){


    return (
        <div className={`tw-w-full tw-bg-white tw-border-0 tw-border-b tw-border-solid tw-border-gray-200 tw-gap-3 tw-overflow-x-auto tw-px-4 tw-py-2 tw-flex tw-place-items-center tw-shadow-sm
                             ${className||''}`}>

            <div className="tw-flex tw-gap-3 tw-place-items-center tw-min-w-fit">
                <div className="tw-flex tw-flex-col tw-leading-tight tw-pr-2">
                    <span className="tw-text-base tw-font-semibold tw-text-gray-950">PyUI Builder</span>
                    <span className="tw-text-[12px] tw-text-gray-500">by Samin Yeasar</span>
                </div>
                <Select
                    value={framework}
                    options={items}
                    onChange={(key) => {onFrameworkChange(key)}}
                    className="tw-min-w-[150px]"
                />
            </div>
            <div className="tw-ml-auto tw-flex tw-gap-2 tw-place-items-center tw-min-w-fit">
                <a href="https://solez.vercel.app" target="_blank" rel="noopener noreferrer"
                    className="tw-flex tw-place-items-center tw-gap-1 tw-text-sm tw-text-gray-700 tw-no-underline hover:tw-text-blue-600">
                    <LinkOutlined />
                    <span>Samin</span>
                </a>
                <a href="https://github.com/Solez-ai" target="_blank" rel="noopener noreferrer"
                    className="tw-flex tw-place-items-center tw-gap-1 tw-text-sm tw-text-gray-700 tw-no-underline hover:tw-text-blue-600">
                    <GithubFilled />
                    <span>GitHub</span>
                </a>
                <Input value={projectName} onChange={(e) => onProjectNameChange(e.target.value)} placeholder="project name" className="tw-w-[220px]"/>
                <Button icon={<DownloadOutlined />} onClick={onExportClick}>
                    Export code
                </Button>
            </div>

        </div>
    )

} 

export default Header
