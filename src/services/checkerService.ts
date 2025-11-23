import { Project, EligibilityResult, ProjectCheckResult } from '@/types';

export const projects: Project[] = [
  {
    id: 'meowwnads',
    name: 'Meowwnads',
    image: 'https://pbs.twimg.com/profile_images/1873575423906299904/lTXCfeTr_400x400.jpg',
    checkerUrl: 'https://meowwn.ad/checker/',
    xUrl: 'https://x.com/meowwnads',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/meowwnads?address=`,
  },
  {
    id: 'poply',
    name: 'Poply',
    image: 'https://pbs.twimg.com/profile_images/1960818622537814016/3qEMjXr4_400x400.jpg',
    checkerUrl: 'https://poply.xyz/poply-otters-collection?wlChecker=true',
    xUrl: 'https://x.com/poply_xyz',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/poply?address=`,
  },
  {
    id: 'woolly',
    name: 'Woolly Eggs',
    image: 'https://pbs.twimg.com/profile_images/1943276572355760130/jRWqD9jj_400x400.jpg',
    checkerUrl: 'https://yarnguard.vercel.app/',
    xUrl: 'https://x.com/WoollyEggs',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/woolly?address=`,
  },
  {
    id: 'monadnomads',
    name: 'MonadNomads',
    image: 'https://pbs.twimg.com/profile_images/1621289636956966913/udbNyRbM_400x400.jpg',
    checkerUrl: 'https://www.monadnomads.xyz/',
    xUrl: 'https://x.com/MonadNomadsNFT',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/monadnomads`,
  },
  {
    id: 'monicorns',
    name: 'The Monicorns',
    image: 'https://pbs.twimg.com/profile_images/1878149501204017152/Jx_-cLic_400x400.jpg',
    checkerUrl: 'https://www.monicorns.xyz/',
    xUrl: 'https://x.com/the_monicorns',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/monicorns`,
  },
  {
    id: 'coronad',
    name: 'Coronad',
    image: 'https://pbs.twimg.com/profile_images/1960360500065337344/ixhau0qf_400x400.jpg',
    checkerUrl: 'https://checker.coronad.xyz/',
    xUrl: 'https://x.com/Coronad_xyz',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/coronad`,
  },
  {
    id: 'mouch',
    name: 'Mouch',
    image: 'https://pbs.twimg.com/profile_images/1974602989735235584/gm5ij753_400x400.jpg',
    checkerUrl: 'https://checker.lamouch.xyz/',
    xUrl: 'https://x.com/LaMouchNFT',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/mouch`,
  },
  {
    id: 'mongang',
    name: 'Mongang',
    image: 'https://pbs.twimg.com/profile_images/1949824062370324480/59Vh4tQu_400x400.jpg',
    checkerUrl: 'https://mongangchecker.vercel.app/',
    xUrl: 'https://x.com/mongang_xyz',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/mongang`,
  },
  {
    id: 'overnads',
    name: 'Overnads',
    image: 'https://pbs.twimg.com/profile_images/1848407664994213888/7zXhCACY_400x400.jpg',
    checkerUrl: 'https://portal.overnads.xyz/welcome',
    xUrl: 'https://x.com/overnads',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/overnads?address=`,
  },
  {
    id: 'wonad',
    name: 'Wonad',
    image: 'https://pbs.twimg.com/profile_images/1819387582951968769/RA52IEt0_400x400.jpg',
    checkerUrl: 'https://app.thiswonad.xyz/checker',
    xUrl: 'https://x.com/thiswonad',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/wonad?address=`,
  },
  {
    id: 'owlsmonad',
    name: 'OwlsMonad',
    image: 'https://pbs.twimg.com/profile_images/1876831188217741313/8aYwKgPM_400x400.jpg',
    checkerUrl: 'https://octotools.xyz/wallet-checker',
    xUrl: 'https://x.com/Owls_nft_',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/owlsmonad`,
  },
  {
    id: 'octonads',
    name: 'OctoNads',
    image: 'https://pbs.twimg.com/profile_images/1895511038063489024/_uOw0SxD_400x400.png',
    checkerUrl: 'https://octotools.xyz/wallet-checker',
    xUrl: 'https://x.com/OctoNads',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/octonads`,
  }
];

export async function checkEligibility(
  address: string,
  project: Project
): Promise<EligibilityResult> {
  try {
    console.log('Checking project:', project.name);
    console.log('API URL:', project.apiUrl);
    
    let response: Response;
    let data: any;

    // MonadNomads
    if (project.id === 'monadnomads') {
      console.log('Making POST request to MonadNomads with address:', address);
      
      response = await fetch(project.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      
      if (!response.ok) {
        console.log('MonadNomads Response not OK:', response.status);
        return {
          eligible: false,
          message: 'Unable to check eligibility',
          details: `API responded with status: ${response.status}`,
        };
      }

      data = await response.json();
      console.log('MonadNomads API Response data:', data);
      
      if (data.isWhitelisted === true) {
        const listNames = data.lists?.map((list: any) => list.listName).join(', ') || data.list;
        return {
          eligible: true,
          message: 'You are eligible!',
          details: `${data.message}`,
        };
      }
      
      return {
        eligible: false,
        message: 'Not whitelisted',
        details: 'Wallet is not whitelisted',
      };
    }

    // OwlsMonad
    if (project.id === 'owlsmonad') {
      console.log('Making POST request to OwlsMonad with address:', address);
      
      response = await fetch(project.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      
      if (!response.ok) {
        console.log('OwlsMonad Response not OK:', response.status);
        return {
          eligible: false,
          message: 'Unable to check eligibility',
          details: `API responded with status: ${response.status}`,
        };
      }

      data = await response.json();
      console.log('OwlsMonad API Response data:', data);
      
      const owlsData = data.OwlsNad;
      if (owlsData && owlsData.eligible === true) {
        const entries = owlsData.entries || [];
        
        if (entries.length > 0) {
          const firstEntry = entries[0];
          const details = `Spot: ${firstEntry.spotType}, Phase: ${firstEntry.phase}`;
          
          return {
            eligible: true,
            message: 'You are eligible!',
            details: details,
          };
        }
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: 'No whitelist spots found',
      };
    }

    // OctoNads
    if (project.id === 'octonads') {
      console.log('Making POST request to OctoNads with address:', address);
      
      response = await fetch(project.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      
      if (!response.ok) {
        console.log('OctoNads Response not OK:', response.status);
        return {
          eligible: false,
          message: 'Unable to check eligibility',
          details: `API responded with status: ${response.status}`,
        };
      }

      data = await response.json();
      console.log('OctoNads API Response data:', data);
      
      const octoData = data.OctoNads_Genesis;
      if (octoData && octoData.eligible === true) {
        const entries = octoData.entries || [];
        
        if (entries.length > 0) {
          const firstEntry = entries[0];
          const details = `Spot: ${firstEntry.spotType}, Phase: ${firstEntry.phase}`;
          
          return {
            eligible: true,
            message: 'You are eligible!',
            details: details,
          };
        }
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: 'No whitelist spots found',
      };
    }

    // Monicorns
    if (project.id === 'monicorns') {
      console.log('Making POST request to Monicorns with address:', address);
      
      response = await fetch(project.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      
      if (!response.ok) {
        console.log('Monicorns Response not OK:', response.status);
        return {
          eligible: false,
          message: 'Unable to check eligibility',
          details: `API responded with status: ${response.status}`,
        };
      }

      data = await response.json();
      console.log('Monicorns API Response data:', data);
      
      if (data.result) {
        return {
          eligible: true,
          message: 'You are eligible!',
          details: `Role: ${data.result}, click the checker for details.`,
        };
      }
      
      if (data.error) {
        return {
          eligible: false,
          message: 'Not eligible',
          details: data.error || 'Failed to check waitlist status',
        };
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: 'No waitlist status found',
      };
    }

    // Coronad
    if (project.id === 'coronad') {
      console.log('Making POST request to Coronad with address:', address);
      
      response = await fetch(project.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      
      if (!response.ok) {
        console.log('Coronad Response not OK:', response.status);
        return {
          eligible: false,
          message: 'Unable to check eligibility',
          details: `API responded with status: ${response.status}`,
        };
      }

      data = await response.json();
      console.log('Coronad API Response data:', data);
      
      if (data.success === true && data.data?.whitelisted === true) {
        return {
          eligible: true,
          message: 'You are eligible!',
          details: `Your wallet is eligible, click the checker for details.`,
        };
      }
      
      if (data.success === true && data.data?.whitelisted === false) {
        return {
          eligible: false,
          message: 'Not eligible',
          details: data.data.message || 'Address not found in whitelist',
        };
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: data.error || 'Failed to check eligibility',
      };
    }

    // Mouch
    if (project.id === 'mouch') {
      console.log('Making POST request to Mouch with address:', address);
      
      response = await fetch(project.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      
      if (!response.ok) {
        console.log('Mouch Response not OK:', response.status);
        return {
          eligible: false,
          message: 'Unable to check eligibility',
          details: `API responded with status: ${response.status}`,
        };
      }

      data = await response.json();
      console.log('Mouch API Response data:', data);
      
      if (data.success === true && data.totalWl > 0) {
        return {
          eligible: true,
          message: 'You are eligible!',
          details: `Whitelist spots: ${data.totalWl} (GTD: ${data.wlGtd}, FCFS: ${data.wlFcfs}, Free: ${data.wlFreeMint})`,
        };
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: 'No whitelist spots found',
      };
    }

    // Mongang
    if (project.id === 'mongang') {
      console.log('Making POST request to Mongang with address:', address);
      
      response = await fetch(project.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      
      if (!response.ok) {
        console.log('Mongang Response not OK:', response.status);
        return {
          eligible: false,
          message: 'Unable to check eligibility',
          details: `API responded with status: ${response.status}`,
        };
      }

      data = await response.json();
      console.log('Mongang API Response data:', data);
      
      const totals = data.totals || {};
      const gtd = totals.GTD || 0;
      const fcfs = totals.FCFS || 0;
      const freeMint = totals['Free Mint WL'] || 0;
      const totalWL = gtd + fcfs + freeMint;
      
      if (totalWL > 0) {
        let details = '';
        const parts = [];
        if (gtd > 0) parts.push(`GTD: ${gtd}`);
        if (fcfs > 0) parts.push(`FCFS: ${fcfs}`);
        if (freeMint > 0) parts.push(`Free: ${freeMint}`);
        
        details = parts.join(', ');
        
        return {
          eligible: true,
          message: 'You are eligible!',
          details: details,
        };
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: 'No whitelist spots found',
      };
    }
    
    // Handle GET requests for other projects
    console.log('Making GET request to:', `${project.apiUrl}${address}`);
    response = await fetch(`${project.apiUrl}${address}`);
    
    if (!response.ok) {
      console.log('Response not OK:', response.status);
      return {
        eligible: false,
        message: 'Unable to check eligibility',
        details: `API responded with status: ${response.status}`,
      };
    }

    data = await response.json();
    console.log('API Response data:', data);
    
    // Meowwnads
    if (project.id === 'meowwnads') {
      if (data.ok === true && data.message && data.message.includes('Congratulations')) {
        return {
          eligible: true,
          message: 'You are eligible!',
          details: data.message.replace(/<br>/g, ' - '),
        };
      }
      
      if (data.error) {
        return {
          eligible: false,
          message: 'Service Error',
          details: data.message || data.error,
        };
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: data.message || 'No eligibility information available.',
      };
    }

    // Wonad
    if (project.id === 'wonad') {
      console.log('Making GET request to Wonad with address:', address);
      
      response = await fetch(`${project.apiUrl}${address}`);
      
      if (!response.ok) {
        console.log('Wonad Response not OK:', response.status);
        return {
          eligible: false,
          message: 'Unable to check eligibility',
          details: `API responded with status: ${response.status}`,
        };
      }

      data = await response.json();
      console.log('Wonad API Response data:', data);
      
      if (data.isEligible === true) {
        return {
          eligible: true,
          message: 'You are eligible!',
          details: `Allocation: ${data.allocation}, click the checker for details.`,
        };
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: 'No allocation found',
      };
    }
    
    // Poply
    if (project.id === 'poply') {
      if (data.isWhitelisted === true) {
        return {
          eligible: true,
          message: 'You are eligible!',
          details: `Your wallet is eligible for the Poply NFT.`,
        };
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: `Your wallet is not eligible for the Poply NFT.`,
      };
    }

    // Overnads
    if (project.id === 'overnads') {
      console.log('Making GET request to Overnads with address:', address);
      
      response = await fetch(`${project.apiUrl}${address}`);
      
      if (!response.ok) {
        console.log('Overnads Response not OK:', response.status);
        return {
          eligible: false,
          message: 'Unable to check eligibility',
          details: `API responded with status: ${response.status}`,
        };
      }

      data = await response.json();
      console.log('Overnads API Response data:', data);
      
      if (data.prize && data.prize !== null) {
        return {
          eligible: true,
          message: 'You are eligible!',
          details: `Prize: ${data.prize}`,
        };
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: 'No prize found',
      };
    }
    
    // Woolly Eggs
    if (project.id === 'woolly') {
      if (data.success === true) {
        return {
          eligible: true,
          message: 'You are eligible!',
          details: `${data.congratulation}`,
        };
      }
      
      return {
        eligible: false,
        message: 'Not eligible',
        details: data.message || 'Your address is not in the whitelist',
      };
    }
    
    return {
      eligible: false,
      message: 'Not eligible',
      details: 'No eligibility information available.',
    };
  } catch (error) {
    console.error(`Error checking eligibility for ${project.name}:`, error);
    return {
      eligible: false,
      message: 'Error checking eligibility',
      details: 'Failed to connect to the checker API.',
    };
  }
}

export async function checkAllProjects(address: string): Promise<ProjectCheckResult[]> {
  const results: ProjectCheckResult[] = [];

  const checkPromises = projects.map(async (project) => {
    const eligibility = await checkEligibility(address, project);
    return {
      project,
      eligibility,
    };
  });

  const allResults = await Promise.all(checkPromises);
  
  return allResults.filter((result) => result.eligibility.eligible);
}