
import {Editor} from "@tinymce/tinymce-react";

// eslint-disable-next-line react/prop-types
const TextEditor = ({ content, onContentChange })=>{


    const handleEditorChange = (newContent, editor) => {
        onContentChange(newContent);
    };

        return (
                <div>
                        <Editor apiKey='xkgysovvognmhyyeg2u02c9tdzx249cyq9hlq4z3jhh4r93h'
                                value={content}
                                init={{

                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate  mentions  tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                }}
                                onEditorChange={handleEditorChange}
                        />
                </div>
        )
}

export default TextEditor