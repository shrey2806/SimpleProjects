import { HuffmanEncoder } from './huffmanEncoder.js';

onload = function(){
    const treeDisplay = this.document.getElementById('treeDisplay');
    const compressionDisplay = this.document.getElementById('compressionDisplay');
    const zip  = this.document.getElementById('ZipButton');
    const unzip = this.document.getElementById('UnzipButton');
    const uploadBtn = this.document.getElementById('uploadFile');

    
    const encoder = new HuffmanEncoder();


    uploadBtn.addEventListener('change',()=>{ alert("File uploaded") });


    
    zip.onclick = function(){

        let file = uploadBtn.files[0];

        if(file===undefined){
            alert("NO file uploaded");
            return;
        }

        const fileReader = new FileReader();
        
        fileReader.onload = function(fileLoadedEvent){
            const text = fileLoadedEvent.target.result;

            if(text.length===0){
                alert("Text Length cannot be zero");
                return;
            }

            const result = encoder.encodeData(text);
            const treeStruct = encoder.displayTree(result.huffmanTree);

            downloadFile(file.name.split('.')[0] + '_encoded.txt', result.encodedText);

            treeDisplay.innerText = treeStruct;
            const info  = "Compression Ratio : " + text.length/result.encodedText.length;
            compressionDisplay.innerText = "Compression complete and file sent for Download" + '\n' + info;

        };

        fileReader.readAsText(file, "UTF-8");
    }
    
    


};


function downloadFile(fileName, data){
    let a = document.createElement('a');
    a.href = "data:application/octet-stream,"+encodeURIComponent(data);
    a.download = fileName;
    a.click();
}