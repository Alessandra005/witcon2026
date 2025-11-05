
import Title from '../components/text/Title';
import Text from '../components/text/Text';
import Header from "../components/text/Header";

interface Team {
    name: string;
    position?: string;
}

const teams: Team[] = [
    {
        name: "Devin Diaz",
        position: "Industry Relations Chair"
    },
    {
        name: "Rhode Sanchez",
        position: "Industry Relations Lead"
    },
    {
        name: "Narel Rodriguez",
        position: "Industry Relations Lead"
    },
    {
        name: "Victoria Hernandez",
        position: "Industry Relations Lead"
    },


]
export default function Teams(){
    return (
        <section className = 'w-full pt-6 pb-10'>
        <Header className='py-6'>Teams</Header>
        <Title className="text-3xl font-semibold text-center mb-4">Industry Relations</Title>
        <div className="w-full rounded-2xl bg-[color:var(--color-secondary-mint)]/100 p-66 md:p-8 shadow-md ">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 place-items-center">

    {teams.map((team, index) => (
      <div key={index} className="flex flex-col items-center text-cente hover:scale-105 transition-transform duration-300
      ">
        {/* Circle for photo */}
        {/* make a link for everyones linkedin when you click?? */}
        <div className="w-24 h-24 rounded-full bg-neutral-200 overflow-hidden mb-3  ">
          {/* If you have images: */}
          {/* <img src={team.image} alt={team.name} className="w-full h-full object-cover" /> */}
        </div>

        {/* Name + position */}
        <Text className="font-medium leading-tight">{team.name || 'First Last Name'}</Text>
        <Text className="text-sm opacity-80 leading-tight">{team.position || 'Position'}</Text>
      </div>
    ))}
  </div>
        </div>





    </section>);
}