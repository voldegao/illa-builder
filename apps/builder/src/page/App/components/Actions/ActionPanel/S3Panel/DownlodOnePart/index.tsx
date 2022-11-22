import { FC } from "react"
import {
  codeEditorLabelStyle,
  s3ItemCodeEditorStyle,
  s3ItemStyle,
} from "@/page/App/components/Actions/ActionPanel/S3Panel/style"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  DownloadOneContent,
  S3Action,
  S3ActionTypeContent,
} from "@/redux/currentApp/action/s3Action"
import { S3ActionPartProps } from "@/page/App/components/Actions/ActionPanel/S3Panel/interface"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export const DownloadOnePart: FC<S3ActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >

  const commandArgs = props.commandArgs as DownloadOneContent

  return (
    <>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.bucket_name")}
        </span>
        <CodeEditor
          lineNumbers
          height="88px"
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          value={commandArgs.bucketName}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    bucketName: value,
                  } as DownloadOneContent,
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.object_key")}
        </span>
        <CodeEditor
          lineNumbers
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          value={commandArgs.objectKey}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    objectKey: value,
                  } as DownloadOneContent,
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
    </>
  )
}

DownloadOnePart.displayName = "DownloadOnePart"
