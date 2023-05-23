const testimonialData = [
  {
    id: 'schuster-braun',
    name: 'Schuster Braun',
    image: 'schuster.jpg',
    text: `#VetsWhoCode on paper is a web development boot camp. In my opinion it
      is the best transition assistance program out there. I am so grateful for the
      access to a new life the boot camp gave me.`,
    signature: 'Schuster Braun, US Navy | Front End Engineer, Amazon Web Services',
  },
  {
    id: 'john-garcia',
    name: 'John Garcia',
    image: 'john-garcia.png',
    text: `VWC helped me gain the technical knowledge I needed in order to get the
      attention of employers. The guidance, support and experience I had going
      through the program continues to help me in my role as a full time web
      developer.`,
    signature: 'John Garcia, US Air Force | Front End Engineer, ForUsAll',
  },
  {
    id: 'carla-kroll',
    name: 'Carla Kroll',
    image: 'carla-kroll.jpg',
    text: `The course was great! I laughed, I learned, I got mad, I got
      excited...then mad again. But in the end, I&apos;ve developed skills that have
      helped me become a successful frontend developer in Chicago and have found a
      group of people in VWC that understand me, and we really work and grow
      together better than anything I could have imagined.`,
    signature: 'Carla Kroll, US Air Force | Frontend Developer, J. Walter Thompson Worldwide',
  },
  {
    id: 'osvaldo-vargas',
    name: 'Osvaldo Vargas',
    image: 'ozzie.png',
    text: `During my transition, I have signed up for and utilized services from
      over 14 different Non-Profits, Corporate, and State resources. I attended all
      three US Army military transition tracks (Business, Education, Career), been a
      part of a variety of technology training programs and transition programs. Of
      all of these programs, only three have made a significant contribution to my
      transition, and of these three organizations, only one has truly changed my
      life for the better. Vets Who Code delivered more value to me than 12 of the
      non-profits combined.`,
    signature:
      'Osvaldo &quot;Ozzie&quot; Vargas, US Army | Fullstack Developer, Application Lead, Novetta',
  },
  {
    id: 'jeff-martin',
    name: 'Jeff Martin',
    image: 'jeff-martin.jpg',
    text: `#VetsWhoCode&apos;s tenacious focus on language and computer science
      fundamentals over frameworks was invaluable in my career transition from being
      a Radiology Technician in the US Army to building cloud scale infrastructure
      at Microsoft. The coaching from the #VetsWhoCode’s talented and passionate
      mentor network proved to be a priceless asset even after graduating. Come
      ready to learn and you will succeed here.`,
    signature: 'Jeff Martin, US Army | DevOps Engineer, Microsoft/Github',
  },
]

export function getTestimonials() {
  return testimonialData
}

export function getTestimonialById(id) {
  return testimonialData.find(testimonial => testimonial.id === id)
}

export function getTestimonialByName(name) {
  return testimonialData.find(testimonial => testimonial.name === name)
}
