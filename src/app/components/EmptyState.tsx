interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'You currently have no projects in here yet.' }: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-[24px]">
        {/* Empty State SVG */}
        <div className="w-[340px] h-[260px]">
          <svg width="293" height="260" viewBox="0 0 293 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
            <g style={{ mixBlendMode: 'multiply' }}>
              <path opacity="0.519475" fillRule="evenodd" clipRule="evenodd" d="M236.876 70.8203C257.414 89.9015 298.868 120.301 274.78 150.752C250.691 181.202 213.821 248.64 177.411 256.747C141 264.854 148.609 196.137 77.7781 196.225C6.94677 196.313 -13.2923 154.527 12.5296 125.804C38.3514 97.0809 56.0794 87.0182 77.5084 88.4868C98.9373 89.9554 109.775 86.7179 136.14 42.2618C162.506 -2.19426 200.532 1.06603 217.345 17.3018C234.159 33.5375 216.337 51.739 236.876 70.8203Z" stroke="#F1F1F3" strokeWidth="3.53952"/>
              <path opacity="0.519475" fillRule="evenodd" clipRule="evenodd" d="M49.1666 3.49344C35.0578 8.32456 25.7886 18.7868 30.4232 33.1468C35.0578 47.5069 44.5183 59.9916 54.0763 59.9916C63.6343 59.9916 83.1296 36.8732 78.3703 20.3816C73.6109 3.88997 63.2754 -1.33768 49.1666 3.49344Z" stroke="#F1F1F3" strokeWidth="3.53952"/>
              <path d="M11.3096 168.333H260.755" stroke="#D9D9DE" strokeWidth="3.53952" strokeLinecap="round"/>
              <path d="M274.826 168.333H282.501" stroke="#D9D9DE" strokeWidth="3.53952" strokeLinecap="round"/>
              <rect x="27.9395" y="154.239" width="57.5643" height="12.8125" rx="1.76976" fill="#F1F1F3"/>
              <path d="M34.335 160.645H53.5231" stroke="#D9D9DE" strokeWidth="3.53952" strokeLinecap="round"/>
              <path d="M27.099 77.3763C35.3754 70.4437 44.7314 77.6419 52.1347 94.3586C59.2389 110.4 63.7174 133.174 63.7174 155.077C63.7174 156.588 61.5629 156.853 61.1972 155.387C57.4064 140.191 52.0129 127.68 45.1526 116.788C42.4637 112.519 39.6342 108.622 36.425 104.646C35.2015 103.13 33.9811 101.672 32.4597 99.8933C32.4522 99.8846 29.6779 96.6572 28.9683 95.8177C23.6091 89.477 21.9652 86.3002 23.1531 82.5864C23.7209 80.8111 25.0129 79.1237 27.099 77.3763Z" fill="#D9D9DE"/>
              <path d="M44.4943 42.9438C55.1091 41.0535 61.5035 53.9149 64.4136 78.1433C66.843 98.3694 66.7274 126.212 64.4535 155.797C64.3322 157.376 62.0213 157.374 61.9025 155.795C60.2121 133.346 56.116 113.498 49.8619 93.5118C47.5636 86.1671 38.9907 62.293 37.8959 58.0041C35.5601 48.8522 37.2387 44.2359 44.4943 42.9438Z" fill="#D9D9DE"/>
              <path d="M61.7754 148.446C58.2775 131.414 52.1976 106.515 35.0332 86.1924" stroke="#F6F7F8" strokeWidth="1.76976"/>
              <path d="M63.5904 146.957C63.5904 129.91 58.2712 76.7245 47.7178 53.1265" stroke="#F6F7F8" strokeWidth="1.76976"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M45.2546 137.859C44.8957 135.702 46.5593 133.739 48.7461 133.739H69.8136C72.0004 133.739 73.664 135.702 73.3051 137.859L70.6454 153.843C70.3614 155.55 68.8845 156.801 67.1539 156.801H51.4058C49.6752 156.801 48.1984 155.55 47.9143 153.843L45.2546 137.859Z" fill="#F1F1F3"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M45.502 136.311L72.8011 140.873L73.9485 133.836L45.502 136.311Z" fill="#D9D9DE"/>
              <rect x="40.7314" y="127.333" width="37.097" height="8.96875" rx="3.53952" fill="#F1F1F3"/>
              <path d="M230.055 154.239H233.253C238.551 154.239 242.847 150.003 242.847 144.777V138.47C242.847 135.857 240.699 133.739 238.05 133.739H231.654" stroke="#D9D9DE" strokeWidth="7.07903"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M233.742 130.467C233.967 127.39 231.531 124.77 228.446 124.77H207.356C204.271 124.77 201.836 127.39 202.061 130.467L204.38 162.13C204.583 164.904 206.894 167.051 209.675 167.051H226.128C228.909 167.051 231.219 164.904 231.423 162.13L233.742 130.467Z" fill="#F1F1F3"/>
              <path d="M82.9463 112.326C82.9463 106.461 87.7004 101.707 93.5648 101.707H196.411C202.275 101.707 207.029 106.461 207.029 112.326V178.582H82.9463V112.326Z" fill="#DADADA"/>
              <path d="M66.3164 178.582H223.659V178.582C223.659 185.658 217.923 191.395 210.846 191.395H79.1289C72.0528 191.395 66.3164 185.658 66.3164 178.582V178.582Z" fill="#7D86A0" fillOpacity="0.8"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M100.854 124.77H189.12V127.332H100.854V124.77Z" fill="#A4ADC5"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M100.854 135.02H189.12V137.582H100.854V135.02Z" fill="#A4ADC5"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M100.854 145.27H189.12V147.832H100.854V145.27Z" fill="#A4ADC5"/>
              <rect x="100.854" y="155.52" width="48.636" height="2.5625" fill="#A4ADC5"/>
            </g>
          </svg>
        </div>
        
        {/* Message */}
        <p 
          className="text-muted-foreground"
          style={{ 
            fontFamily: 'var(--font-family)', 
            fontWeight: 'var(--font-weight-regular)', 
            fontSize: 'var(--font-size-14)', 
            lineHeight: 'var(--line-height-20)',
            textAlign: 'center'
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}