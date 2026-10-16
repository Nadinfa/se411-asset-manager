export default function About() {
  const members = [
    { name: 'Nadin Alaskar', id: '222410587' },
    { name: 'Leena Almosa', id: '222410578' },
  ];

  return (
    <main className="page narrow">
      <section className="page-header">
        <div>
          <p className="eyebrow">About</p>
          <h1>Meet the Team</h1>
          <p>This application was created for the SE411 Fall 2026–27 course project.</p>
        </div>
      </section>

      <section className="about-card">
        <h2>Project</h2>
        <p><strong>AssetTrack</strong> is a React frontend application for managing company computer assets. Part 1 stores data in memory as a JavaScript collection of objects rather than using a backend or database.</p>
      </section>

      <section className="team-grid">
        {members.map((member, index) => (
          <article className="member-card" key={`${member.name}-${index}`}>
            <div className="avatar">{index + 1}</div>
            <h3>{member.name}</h3>
            <p>{member.id}</p>
          </article>
        ))}
      </section>

      {/* <p className="note">Replace the placeholder names and IDs with your actual team information before submission. Add a fourth member here if your group has four students.</p> */}
    </main>
  );
}
