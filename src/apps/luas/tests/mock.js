import { setMock } from '../../../libs/requests/requests';

export function mockRequests() {
    setMock(
        'http://luasforecasts.rpa.ie/xml/get.ashx?action=forecast&encrypt=false&stop=HAR',
        '<stopInfo created="2019-12-20T10:55:30" stop="Harcourt" stopAbv="HAR"><message>Green Line services operating normally</message><direction name="Inbound"><tram dueMins="DUE" destination="Broombridge" /><tram dueMins="7" destination="Parnell" /><tram dueMins="15" destination="Broombridge" /><tram dueMins="18" destination="Parnell" /></direction><direction name="Outbound"><tram dueMins="DUE" destination="Bride\'s Glen" /><tram dueMins="10" destination="Sandyford" /><tram dueMins="14" destination="Bride\'s Glen" /></direction></stopInfo>'
    );

    setMock(
        'http://luasforecasts.rpa.ie/xml/get.ashx?action=forecast&encrypt=false&stop=GAL',
        '<stopInfo created="2019-12-20T11:12:19" stop="The Gallops" stopAbv="GAL"><message>Green Line services operating normally</message><direction name="Inbound"><tram dueMins="5" destination="Parnell" /><tram dueMins="17" destination="Parnell" /></direction><direction name="Outbound"><tram dueMins="DUE" destination="Bride\'s Glen" /><tram dueMins="8" destination="Bride\'s Glen" /></direction></stopInfo>'
    );

    setMock(
        'http://luasforecasts.rpa.ie/xml/get.ashx?action=forecast&encrypt=false&stop=DAW',
        '<stopInfo created="2019-12-20T11:13:09" stop="Dawson" stopAbv="DAW"><message>Green Line services operating normally</message><direction name="Inbound"><tram dueMins="DUE" destination="Parnell" /><tram dueMins="3" destination="Broombridge" /><tram dueMins="7" destination="Parnell" /><tram dueMins="15" destination="Broombridge" /></direction><direction name="Outbound"><tram dueMins="4" destination="Bride\'s Glen" /><tram dueMins="12" destination="Sandyford" /></direction></stopInfo>'
    );

    setMock(
        'http://luasforecasts.rpa.ie/xml/get.ashx?action=forecast&encrypt=false&stop=STS',
        '<stopInfo created="2019-12-20T14:40:19" stop="St. Stephen\'s Green" stopAbv="STS"><message>Green Line services operating normally</message><direction name="Inbound"><tram dueMins="DUE" destination="Broombridge" /><tram dueMins="10" destination="Parnell" /><tram dueMins="12" destination="Broombridge" /></direction><direction name="Outbound"><tram dueMins="2" destination="Sandyford" /><tram dueMins="10" destination="Bride\'s Glen" /><tram dueMins="15" destination="Sandyford" /></direction></stopInfo>'
    );
}