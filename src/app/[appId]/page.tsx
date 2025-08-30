import { apps } from '@/lib/apps';
import {AppView} from '@/components/portfolio/AppView';

export async function generateStaticParams() {
  return Object.values(apps)
    .filter(app => !app.externalUrl)
    .map(app => ({
      appId: app.id,
    }));
}

export default function AppIdPage(){
  return (<AppView />)
}
