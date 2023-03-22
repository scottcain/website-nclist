import logo from './logo.svg';
import './App.css';
import { RemoteFile } from 'generic-filehandle'
import NCList from '@gmod/nclist'

function App() {
  return (
    (async () => {
      const store = new NCList({
         baseUrl: `https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS286/c_elegans_PRJNA13758/`,
         urlTemplate: 'tracks/Curated_Genes/{refseq}/trackData.jsonz',
         readFile: url => new RemoteFile(url).readFile(),
      })

      for await (const feature of store.getFeatures({
         refName: 'I',
         start: 5720822,
         end: 5732439,
      })) {
           console.log(
              `got feature at ${feature.get('seq_id')}:${feature.get(
                  'start',
                )}-${feature.get('end')}`,
           )
      }
    })()
  );
}

export default App;
