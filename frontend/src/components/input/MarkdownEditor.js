import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MarkdownEditor = (props) => {
    const editorRef = useRef(null);
    return (
        <div className=''>
            <label>{props?.label}</label>
            <Editor
                apiKey={process.env.REACT_APP_MARKDOWN_KEY}
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={props.value}
                init={{
                    height: 700,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onChange={(e) => { props.setValue(prev => ({ ...prev, [props?.nameKey]: e.target.getContent() })) }}
            />
            {props && props.errors && props.errors[props.nameKey] && <small className='text-danger'>{props.errors[props.nameKey]}</small>}
        </div>
    );
}

export default MarkdownEditor