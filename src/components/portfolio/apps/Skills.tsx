import { skillsData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Skills() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Skills &amp; Expertise</h2>
      {skillsData.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <p className="font-semibold">{skill.name}</p>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
