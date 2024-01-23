import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faStackOverflow,
  faGithub,
  faInstagram,
  faLinkedin,
  faSlideshare,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { SocialLink } from '../../lib/domain/types'

export const SocialLinks = ({ socialLinks, name }: { socialLinks: SocialLink[]; name: string }) => {
  const email = (name: string) =>
    name.toLowerCase().replace(' ', '.').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').replace('ü', 'u')

  const mapIcons: Record<SocialLink['name'], IconDefinition> = {
    blog: faGlobe,
    'stack-overflow': faStackOverflow,
    github: faGithub,
    instagram: faInstagram,
    key: faKey,
    linkedin: faLinkedin,
    slideshare: faSlideshare,
    twitter: faXTwitter,
  }

  return (
    <div className="inline-flex bg-aptitud-light-grey rounded-lg gap-2 p-2 mt-7">
      <Link
        target="_blank"
        key={name}
        href={`mailto:${email(name)}@aptitud.se`}
        className="bg-white text-black rounded-lg flex p-4 hover:bg-aptitud-dark-grey hover:text-white"
      >
        <i>
          <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6" />
        </i>
      </Link>
      {socialLinks.map(({ url, name }) => (
        <Link
          target="_blank"
          key={name}
          href={url}
          className="bg-white text-black rounded-lg flex p-4 hover:bg-aptitud-dark-grey hover:text-white"
        >
          <i>
            <FontAwesomeIcon icon={mapIcons[name]} className="h-6 w-6" />
          </i>
        </Link>
      ))}
    </div>
  )
}
