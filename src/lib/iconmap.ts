import TwitterIcon from '$lib/icons/socials/twitter.svg';
import InstagramIcon from '$lib/icons/socials/instagram.svg';
import TwitchIcon from '$lib/icons/socials/twitch.svg';
import YoutubeIcon from '$lib/icons/socials/youtube.svg';
import GithubIcon from '$lib/icons/socials/github.svg';
import DiscordIcon from '$lib/icons/socials/discord.svg';
import TiktokIcon from '$lib/icons/socials/tiktok.svg';
import TelegramIcon from '$lib/icons/socials/telegram.svg';
import PaypalIcon from '$lib/icons/socials/paypal.svg';
import BitcoinIcon from '$lib/icons/socials/bitcoin.svg';
import EthereumIcon from '$lib/icons/socials/ethereum.svg';
import LitecoinIcon from '$lib/icons/socials/litecoin.svg';
import SteamIcon from '$lib/icons/socials/steam.svg';
import SoundcloudIcon from '$lib/icons/socials/soundcloud.svg';
import SpotifyIcon from '$lib/icons/socials/spotify.svg';
import CashappIcon from '$lib/icons/socials/cashapp.svg';
import NameMCIcon from '$lib/icons/socials/namemc.svg';
import RedditIcon from '$lib/icons/socials/reddit.svg';
import EmailIcon from '$lib/icons/socials/email.svg';
import KickIcon from '$lib/icons/socials/kick.svg';
import KofiIcon from '$lib/icons/socials/kofi.svg';
import TumblrLogo from '$lib/icons/socials/tumblr.svg';
import RobloxLogo from '$lib/icons/socials/roblox.svg';
import AmazonWishlistIcon from '$lib/icons/socials/amazon-wishlist.svg';
import OnlyfansIcon from '$lib/icons/socials/onlyfans.svg';

import EarlySupporterBadge from '$lib/icons/badges/early_supporter.svg?url';
import PartnerBadge from '$lib/icons/badges/partner.svg?url';
import GoldMedalBadge from '$lib/icons/badges/gold_medal.png';
import SilverMedalBadge from '$lib/icons/badges/silver_medal.png';
import BronzeMedalBadge from '$lib/icons/badges/bronze_medal.png';

import VisibiltyIcon from '$lib/icons/solid/visibility.svg?url';
import VotingChipIcon from '$lib/icons/solid/voting_chip.svg?url';

export const socialMap: { [name: string]: { icon: any; color: string; url: string } } = {
	twitter: {
		icon: TwitterIcon,
		color: '#1DA1F2',
		url: 'https://twitter.com/'
	},
	instagram: {
		icon: InstagramIcon,
		color: '#E1306C',
		url: 'https://instagram.com/'
	},
	twitch: {
		icon: TwitchIcon,
		color: '#9146FF',
		url: 'https://twitch.tv/'
	},
	youtube: {
		icon: YoutubeIcon,
		color: '#FF0000',
		url: 'https://youtube.com/@'
	},
	github: {
		icon: GithubIcon,
		color: '#333',
		url: 'https://github.com/'
	},
	discord: {
		icon: DiscordIcon,
		color: '#7289DA',
		url: 'https://discord.gg/'
	},
	tiktok: {
		icon: TiktokIcon,
		color: '#CCC',
		url: 'https://tiktok.com/@'
	},
	telegram: {
		icon: TelegramIcon,
		color: '#0088CC',
		url: 'https://t.me/'
	},
	paypal: {
		icon: PaypalIcon,
		color: '#003087',
		url: 'https://paypal.me/'
	},
	bitcoin: {
		icon: BitcoinIcon,
		color: '#F7931A',
		url: 'https://www.blockchain.com/explorer/addresses/btc/'
	},
	ethereum: {
		icon: EthereumIcon,
		color: '#3C3C3D',
		url: 'https://www.blockchain.com/explorer/addresses/eth/'
	},
	litecoin: {
		icon: LitecoinIcon,
		color: '#CCC',
		url: 'https://live.blockcypher.com/ltc/address/'
	},
	steam: {
		icon: SteamIcon,
		color: '#CCC',
		url: 'https://steamcommunity.com/profiles/'
	},
	soundcloud: {
		icon: SoundcloudIcon,
		color: '#FF3300',
		url: 'https://soundcloud.com/'
	},
	spotify: {
		icon: SpotifyIcon,
		color: '#1DB954',
		url: 'https://open.spotify.com/artist/'
	},

	cashapp: {
		icon: CashappIcon,
		color: '#00D632',
		url: 'https://cash.app/'
	},
	namemc: {
		icon: NameMCIcon,
		color: '#FFF',
		url: 'https://namemc.com/profile/'
	},
	reddit: {
		icon: RedditIcon,
		color: '#FF4500',
		url: 'https://reddit.com/user/'
	},
	email: {
		icon: EmailIcon,
		color: '#1e88e5',
		url: 'mailto:'
	},
	kick: {
		icon: KickIcon,
		color: '#FFF',
		url: 'https://kick.com/'
	},
	kofi: {
		icon: KofiIcon,
		color: '#29ABE0',
		url: 'https://ko-fi.com/'
	},
	tumblr: {
		icon: TumblrLogo,
		color: '#35465C',
		url: 'https://tumblr.com/'
	},
	roblox: {
		icon: RobloxLogo,
		color: '#FFF',
		url: 'https://roblox.com/users/'
	},
	amazon_wishlist: {
		icon: AmazonWishlistIcon,
		color: '#DDD',
		url: 'https://www.amazon.com/hz/wishlist/ls/'
	},
	onlyfans: {
		icon: OnlyfansIcon,
		color: '#00aeef',
		url: 'https://onlyfans.com/'
	}
};

export const badgeMap: { [name: string]: { name: string; icon: string } } = {
	early_supporter: {
		name: 'Early Supporter',
		icon: EarlySupporterBadge
	},
	partner: {
		name: 'Partner',
		icon: PartnerBadge
	},
	gold_medal: {
		name: 'Gold Medal',
		icon: GoldMedalBadge
	},
	silver_medal: {
		name: 'Silver Medal',
		icon: SilverMedalBadge
	},
	bronze_medal: {
		name: 'Bronze Medal',
		icon: BronzeMedalBadge
	}
};

export const solidMap: { [name: string]: { icon: any } } = {
	visibility: {
		icon: VisibiltyIcon
	},
	voting_chip: {
		icon: VotingChipIcon
	}
};

export function getSocial(name: string) {
	return socialMap[name];
}

export function getBadge(name: string) {
	return badgeMap[name];
}

export function getSolid(name: string) {
	return solidMap[name];
}
