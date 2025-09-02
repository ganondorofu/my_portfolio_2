import { apps } from '@/lib/apps';

export async function generateStaticParams() {
  return Object.values(apps)
    .filter(app => !app.externalUrl && app.id !== 'show-apps')
    .map(app => ({
      appId: app.id,
    }));
}

// This page now only serves to generate static params.
// The actual content is rendered by the layout and AppView.
export default function AppIdPage(){
  return null;
}
