import { useParams, Link } from 'react-router-dom';
import { monsters } from '../content-loader';

export default function MonsterPlaceholderPage() {
  const { id } = useParams<{ id: string }>();
  const monster = id ? monsters[id] : undefined;

  if (!monster) {
    return (
      <div className="placeholder-page">
        <h1>Monster Not Found</h1>
        <p>The monster "{id}" does not exist in the bestiary.</p>
        <Link to="/bestiary" className="placeholder-page__back">
          ← Back to Bestiary
        </Link>
      </div>
    );
  }

  return (
    <div className="placeholder-page">
      <h1>{monster.name}</h1>
      <p className="placeholder-page__category">{monster.category}</p>
      <p className="placeholder-page__threat">Threat Level: {monster.threatLevel}</p>
      <p className="placeholder-page__message">
        Full monster details coming in Feature 3.
      </p>
      <Link to="/bestiary" className="placeholder-page__back">
        ← Back to Bestiary
      </Link>
    </div>
  );
}
