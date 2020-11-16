import IUserRepo from "../api/IUserRepo";
import { UserInfo } from "../models/UserInfo";

class UserRepoMock implements IUserRepo {
    getInfo(): Promise<UserInfo> {
        return Promise.resolve({
            personal: {
                fName: 'Vlad',
                lName: 'Nik',
                gender: "Male",
                dateOfBirth: '19.09.1995',
                img: 'https://static.wikia.nocookie.net/papersplease/images/a/a1/Grestininvestigator.png'
            },
            additional: [
                { key: 'E-mail', value: 'vvnikolson@gmail.com' },
                { key: 'Some Important Data', value: '88005553535' },
                { key: 'Another Important Data', value: '4 8 15 16 23 42' }
            ],
            mapPlaces: [
                {
                    lng: 30.530487,
                    lat: 59.929931,
                    desc: 'Nearest Metro Station'
                },
                {
                    lng: 34.383655,
                    lat: 61.785333,
                    desc: 'Home'
                },
                {
                    lng:34.3523845,
                    lat: 61.7835368,
                    desc: 'Alma mater'
                }
            ]
        });
    }

}

const mockedUserRepo = new UserRepoMock()

export default mockedUserRepo