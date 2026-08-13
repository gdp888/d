#!/usr/bin/env python3
"""Download images from VK for new posts - with proper headers"""
import urllib.request
import os
import ssl

# Images to download - full URLs from VK
IMAGES = {
    # Post 5: Габдуллин Самир (pinned)
    'post_samir_1.jpg': 'https://sun9-50.vkuserphoto.ru/s/v1/ig2/-oae0SFhU8zu6j0IZZfPk8Gx6bwIf-WjTFLSghSHIOQfF9bp6IQUcI0N_jug1gdIZaKYoEVzhDw4jL2w173GhJIf.jpg?quality=95&from=bu&u=2MWImoqycJzTCwH0dl43y5Y7vD6r35ErUWNDmU4X8vw',
    'post_samir_2.jpg': 'https://sun9-79.vkuserphoto.ru/s/v1/ig2/trcmNkpFgy53bfmNmYMc6Sy9UeGVz_X1twMYioi_0RywyLZFsecky91uYdZSJF_EnBFNA9RL0ZLoShZ7ie8cP_0S.jpg?quality=95&from=bu&u=a6xF0PNBzYQHQAGDCIAeD-r6EWzyxwT26z7ofLreem4',
    
    # Post 6: День молодежи
    'post_youth_day.jpg': 'https://sun9-9.vkuserphoto.ru/s/v1/ig2/bIPnQrZQB-mg0zo_2HwTtu1WB6ODH6sNCjOvyKKh0enzhcilBuukW_3Z1KdXubNvfdayZxJnfhKEKhddEXvHcy_i.jpg?quality=95&from=bu&u=XizfG4yLYfJOI4qJVpNikN3vVtBCbFZJnHoa6Akw9kY',
    
    # Post 7: Ваня - реабилитация  
    'post_vanya.jpg': 'https://sun9-13.vkuserphoto.ru/s/v1/ig2/3SNQW_3WMCincYAlf2hstEoFWs_MOacVNfYpOaWj_RIW0kB7cxc75qp-x_gU0j6tsKZnnzi4G-g7inQ1Rdv9qjuq.jpg?quality=95&from=bu&u=1HNr7FVmoegYnTCDKtzOI8rl4vi7W90JzdYUydZwuqk',
    
    # Post 8: День защиты детей
    'post_children_day_1.jpg': 'https://sun9-36.vkuserphoto.ru/s/v1/ig2/-PR04WNJ-_09LqUfNqZwIDmHHGJlr7CCFwIW7-msGcInKUmQG8RoNzI_MkCLo3GI23yuYrCxIP9W3HYCGeRSNdV7.jpg?quality=95&from=bu&u=JSSornwRaWeMUE2nX-QKtfaA7gC7-VYs_Swlv7D7vno',
    'post_children_day_2.jpg': 'https://sun9-69.vkuserphoto.ru/s/v1/ig2/q_OYY696uNait6TaYCZNaV-xLtkhLY-FJkGGMzt6J1GnqO2lSyIqFSWwUCL_lBJLIKR-0wiIWZBBS8GJtTkGel82.jpg?quality=95&from=bu&u=N1S9HoPRLjseyIq8rJ1oshW1fMIlDHc0mnZaCJfBNCw',
    'post_children_day_3.jpg': 'https://sun9-28.vkuserphoto.ru/s/v1/ig2/hPLbMF5Qh_7eMsvO8HVPcGXrCf_JsYDeyfPh6wEYaODyDmGGRpggArxj1RfztDUGBmQLc0pahEH0P03gRd-EjPOY.jpg?quality=95&from=bu&u=yWoU1opICjqRVXnDw3KSI8AUO_B_8JSg2S7dMQEgdKA',
    
    # Post 9: Савелий - сбор закрыт
    'post_saveliy_1.jpg': 'https://sun9-38.vkuserphoto.ru/s/v1/ig2/V2ALaksocvGRgbBIAdFW8TtK7ROUp8yUaMLyjL_FmtaZ73-mCsreLmFYzRBrHMCCikVPtlyjTDJl38OcR2fy1DAM.jpg?quality=95&from=bu&u=aIcxGJkw54s7H6yVXUTIFO9_rf4RMG6lKGvL6_VHtQY',
    'post_saveliy_2.jpg': 'https://sun9-47.vkuserphoto.ru/s/v1/ig2/2MZD5Q8VvneXutajis0AdmRh7pkKTwFUz7V6EwnbKMV9WUXn_HQeCEsIBobP-tQ0x_AtbGalI36gQXU7nk8LANV_.jpg?quality=95&from=bu&u=9Fu2XHziqzwJWOsVp0K5LpnjYXMEaBsvNwpFvqK8e5M',
    'post_saveliy_3.jpg': 'https://sun9-10.vkuserphoto.ru/s/v1/ig2/GOOlY4xEulH9ApkOwaMIdNkyUaGc7ZIFt71_-yhn23e-RaT51ZcQSicLVoVLiDnjG1VyeS4NCxlYvxT31dCCsCCA.jpg?quality=95&from=bu&u=1RuFyslYe86ShD86USbIj5WND51IIQMMDOefj33Sfpo',
    
    # Post 10: Волонтеры фонда
    'post_volunteers.jpg': 'https://sun9-9.vkuserphoto.ru/s/v1/ig2/bIPnQrZQB-mg0zo_2HwTtu1WB6ODH6sNCjOvyKKh0enzhcilBuukW_3Z1KdXubNvfdayZxJnfhKEKhddEXvHcy_i.jpg?quality=95&from=bu&u=XizfG4yLYfJOI4qJVpNikN3vVtBCbFZJnHoa6Akw9kY',
    
    # Additional posts
    'post_june_event.jpg': 'https://sun9-84.vkuserphoto.ru/s/v1/ig2/zDydZribCkkHco--whra86zgHXdwlSjV9HWNoapITmt1M_6GZP_1NSUUV5jnF8ut6kImoGoKJmHUjGjtgDnfJcLU.jpg?quality=95&from=bu&u=-Ho7-eJsUZe7Rq5TzPbfjzthLQtY0J2f2pUJ8wN1low',
}

OUTPUT_DIR = '/home/z/my-project/project/public/images/posts'

# Create SSL context that doesn't verify (for testing)
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

def download_image(url, filename):
    """Download image from URL"""
    filepath = os.path.join(OUTPUT_DIR, filename)
    
    try:
        print(f'Downloading {filename}...')
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Referer': 'https://vk.ru/',
            }
        )
        with urllib.request.urlopen(req, timeout=30, context=ssl_context) as response:
            data = response.read()
            if len(data) > 1000:  # Valid image
                with open(filepath, 'wb') as f:
                    f.write(data)
                print(f'  ✓ Saved {filename} ({len(data)//1024}KB)')
                return True
            else:
                print(f'  ✗ File too small: {len(data)} bytes')
                return False
    except Exception as e:
        print(f'  ✗ Error: {e}')
        return False

def main():
    """Main function"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    success = 0
    fail = 0
    
    for filename, url in IMAGES.items():
        if download_image(url, filename):
            success += 1
        else:
            fail += 1
    
    print(f'\nDone! Downloaded: {success}, Failed: {fail}')

if __name__ == '__main__':
    main()
