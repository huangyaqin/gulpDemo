
gulp ����ѹ�� ����Ӱ汾��

/*src Ŀ¼ΪԴ�룬 build ���ڵ��ԣ�dist Ϊ������ļ� */


1. ���ļ����貿��

2. �Ȱ�װ package.json �е�nodeģ�� npm install

������Ҫȫ�ְ�װ gulp���� 

npm i -g gulp

3. ����ʱ��Ҫ���� gulp ����

�������벢��ʵ�б���   gulp




�޸İ汾�� �� ���޸� 1 .3 ���ɣ�


1����node_modules\gulp-rev\index.js

��144�� manifest[originalFile] = revisionedFile; ����Ϊ: 
manifest[originalFile] = originalFile + ��?v=�� + file.revHash;

2����nodemodules\gulp-rev\nodemodules\rev-path\index.js

10�� return filename + ��-�� + hash + ext;
����Ϊ: return filename + ext;

3����node_modules\gulp-rev-collector\index.js

31��if ( !_.isString(json[key]) ||path.basename(json[key]).replace(new RegExp( opts.revSuffix ), �� )
����Ϊ: if ( !_.isString(json[key]) || path.basename(json[key]).split(��?��)[0] !== path.basename(key) ) { 
��������Ҳ�����һ��û��ϵ����40�а����޸�
 let cleanReplacement =  path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' );
 �޸�Ϊ��
 let cleanReplacement =  path.basename(json[key]).split('?')[0];
