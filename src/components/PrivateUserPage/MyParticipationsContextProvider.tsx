import { ReactElement } from 'react';
import {createContext, useState} from 'react'
import IEvent from './Panels/PanelEvents/IEvent';




const es: IEvent[] = [
    {
      id: 0,
      name: "Event A",
      number: 25,
      size: 25,
      mainCategory: "Sport",
      category: "Karting",
      creationDate: "12/02/2001",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
      imageURL:
        "https://www.info-auto-moto.fr/wp-content/uploads/2022/11/comment-rendre-karting-plus-rapide-scaled-e1668623140167.webp",
      date: "12/02/2023",
      address: "213 avenue Foo",
      candidates: [
        {
          id: 0,
          username: "charles34",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
          note: 4,
        },
        {
          id: 1,
          username: "Hugo32",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi",
          note: 4,
        },
      ],
      participants: [
        {
          id: 0,
          username: "charles34",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
          note: 4,
        },
        {
          id: 1,
          username: "Hugo32",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi",
          note: 4,
        },
      ],
    },
    {
      id: 1,
      name: "Event B",
      number: 5,
      size: 8,
      mainCategory: "Sport",
      category: "Karting",
      creationDate: "12/02/2001",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
      imageURL:
        "https://www.info-auto-moto.fr/wp-content/uploads/2022/11/comment-rendre-karting-plus-rapide-scaled-e1668623140167.webp",
      date: "12/02/2023",
      address: "213 avenue Foo",
      candidates: [
        {
          id: 0,
          username: "charles34",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
          note: 4,
        },
      ],
      participants: [
        {
          id: 1,
          username: "charles34",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
          note: 4,
        },
      ],
    },
  ];




  const es2: IEvent[] = [
    {
      id: 0,
      name: "Event A",
      number: 25,
      size: 25,
      mainCategory: "Sport",
      category: "Karting",
      creationDate: "12/02/2001",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
      imageURL:
        "https://www.info-auto-moto.fr/wp-content/uploads/2022/11/comment-rendre-karting-plus-rapide-scaled-e1668623140167.webp",
      date: "12/02/2023",
      address: "213 avenue Foo",
      candidates: [
        {
          id: 0,
          username: "Hamilton",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
          note: 4,
        },
        {
          id: 1,
          username: "Russel",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi",
          note: 4,
        },
      ],
      participants:[
        {
          id: 0,
          username: "Hamilton",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
          note: 4,
        },
        {
          id: 1,
          username: "Russel",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi",
          note: 4,
        },
      ],
    },
    {
      id: 1,
      name: "Event B",
      number: 5,
      size: 8,
      mainCategory: "Sport",
      category: "Karting",
      creationDate: "12/02/2001",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
      imageURL:
        "https://www.info-auto-moto.fr/wp-content/uploads/2022/11/comment-rendre-karting-plus-rapide-scaled-e1668623140167.webp",
      date: "12/02/2023",
      address: "213 avenue Foo",
      candidates: [
        {
          id: 0,
          username: "Verstappen",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
          note: 4,
        },
      ],
      participants: [
        {
          id: 1,
          username: "Verstappen",
          imageURL: "https://bit.ly/sage-adebayo",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias odio culpa quos dolorem expedita doloremque at vitae quisquam, quam modi, itaque deserunt ducimus voluptatem sint ad dolorum, ratione a ipsa.",
          note: 4,
        },
      ],
    },
  ];


  
export const MyParticipationsContext = createContext<[IEvent[], ()=>void, boolean]>([[],()=>{}, false]);


async function sleep() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("5 seconds have passed.");
}

interface Props {
    children : ReactElement
}

const MyParticipationsContextProvider = ({children}:Props) => {
  
    const [events, setEvents] = useState(es)
    const [isLoading, setLoading] = useState(false)
    //TODO error
    
    const reloadEvents = ()=>{
      setLoading(true)
      sleep()
      .then(()=>{setEvents(es2); setLoading(false)})
      .catch(()=>{setLoading(false)})
    }
  
    return (
        <MyParticipationsContext.Provider value={[events, reloadEvents, isLoading]} >
            {children}
        </MyParticipationsContext.Provider>
  );
}

export default MyParticipationsContextProvider