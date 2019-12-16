(function () {
    function UcgenUyelik(a, b, c) {
		this.a=a;
        this.b=b;
        this.c=c;
    }

    function Ucgen(x, temp) {
        var f = 0;
        var a=temp.a;
        var b=temp.b;
        var c=temp.c;
        if(x<=a)
            f=0;
        else if((a<=x)&&(x<=b))
            f=(x-a)/(b-a);
        else if((b<=x)&&(x<=c))
            f=(c-x)/(c-b);
        else if(c<=x)
            f=0;
        return f;
    }

    function Isiklandirma(anlikisik) {
		var Isik = [
            new UcgenUyelik(0,500,1000),
            new UcgenUyelik(0, 5000,10000),
            new UcgenUyelik(8000,10000,12000),
            new UcgenUyelik(11000,13500,16000),
            new UcgenUyelik(14000,17000,20000)
        ];
		var IsikList = [];
		var uyelikfonk = [4,3,2,1,0];
        
        var toplam=0;
        var toplamAgirlik=0;
        for (var i=0;i<5;i++)
            if(Ucgen(anlikisik,Isik[i])!=0)
                IsikList.push(i);

        for (var i = 0; i < IsikList.length; i++){
            toplamAgirlik += Ucgen(anlikisik, Isik[IsikList[i]]);
            toplam += Ucgen(anlikisik, Isik[IsikList[i]]) * Isik[uyelikfonk[IsikList[i]]].b;
        }
        
        return toplam / toplamAgirlik;
    }

    function Sulama(anliknem, anliktnem) {
		
		var Nem = [
            new UcgenUyelik(0,20,40),
            new UcgenUyelik(20, 39.5,59),
            new UcgenUyelik(50,60,70),
            new UcgenUyelik(60,75,90),
            new UcgenUyelik(80,90,100)
        ];
		var TNem = [
            new UcgenUyelik(0,20,40),
            new UcgenUyelik(30, 49.5,69),
            new UcgenUyelik(60,69.5,79),
            new UcgenUyelik(70,80,90),
            new UcgenUyelik(80,90,100)
        ];
		var Su = [
            new UcgenUyelik(0, 12.5, 25),
            new UcgenUyelik(0,  52.5, 105),
            new UcgenUyelik(55, 107.5, 160),
            new UcgenUyelik(110, 165, 220),
            new UcgenUyelik(165, 220, 275)
        ];
		var NemList = [];
        var TNemList=[];
        
        var uyelikfonk = [];
        uyelikfonk.push([4,3,3,2,1]);
        uyelikfonk.push([4,3,3,2,1]);
        uyelikfonk.push([3,3,2,1,1]);
        uyelikfonk.push([3,2,2,1,0]);
        uyelikfonk.push([2,2,1,1,0]);
        
        var toplam = 0;
        var toplamAgirlik = 0;

        for (var i = 0; i < 5; i++){
            if(Ucgen(anliknem,Nem[i]) != 0)
                NemList.push(i);

            if(Ucgen(anliktnem,TNem[i]) != 0)
                TNemList.push(i);
        }

        for (var i=0;i<NemList.length;i++) {
            for (var j=0; j<TNemList.length;j++){
                toplamAgirlik += Math.min(Ucgen(anliknem,Nem[NemList[i]]),Ucgen(anliktnem,TNem[TNemList[j]]));
                toplam += Math.min(Ucgen(anliknem, Nem[NemList[i]]), Ucgen(anliktnem, TNem[TNemList[j]])) * Su[uyelikfonk[NemList[i]][TNemList[j]]].b;
             }
        }

        return toplam/toplamAgirlik;
	}

    function havalandirma(anliksicaklik, anliknem) {
		var Sicaklik=[
            new UcgenUyelik(-10,0,10),
            new UcgenUyelik(0, 7.5,15),
            new UcgenUyelik(14,20,26),
            new UcgenUyelik(20,30,40),
            new UcgenUyelik(30,40,50)
        ];
		var Nem = [
            new UcgenUyelik(0,20,40),
            new UcgenUyelik(20, 39.5,59),
            new UcgenUyelik(50,60,70),
            new UcgenUyelik(60,75,90),
            new UcgenUyelik(80,90,100)
        ];
		var Fan = [
            new UcgenUyelik(0, 7.5,15),
            new UcgenUyelik(0, 22.5,45),
            new UcgenUyelik(30,45,60),
            new UcgenUyelik( 52.5,  63.75,75),
            new UcgenUyelik(  67.5,  78.75,90)
        ];
		var SicaklikList = [];
        var NemList=[];

        var uyelikfonk =[];
        uyelikfonk.push([0,0,0,0,0]);
        uyelikfonk.push([1,1,1,1,1]);
        uyelikfonk.push([1,2,2,2,2]);
        uyelikfonk.push([2,2,3,3,3]);
        uyelikfonk.push([3,3,3,4,4]);
        
        var toplam=0;
        var toplamAgirlik=0;

        for (var i = 0; i < 5; i++){
            if(Ucgen(anliksicaklik,Sicaklik[i])!=0)
                SicaklikList.push(i);

            if(Ucgen(anliknem,Nem[i])!=0)
                NemList.push(i);
        }

        for (var i=0;i<SicaklikList.length;i++) {
            for (var j=0; j<NemList.length;j++) {
                toplamAgirlik+=Math.min(Ucgen(anliksicaklik,Sicaklik[SicaklikList[i]]),Ucgen(anliknem,Nem[NemList[j]]));
                toplam+=Math.min(Ucgen(anliksicaklik,Sicaklik[SicaklikList[i]]),Ucgen(anliknem,Nem[NemList[j]])) * Fan[uyelikfonk[SicaklikList[i]][NemList[j]]].b;
               }
        }

        return toplam / toplamAgirlik;
    }
    
    //Result
    function Calculate() {
        var anliksicaklik = Sensors['sicaklik'];
        var anliknem = Sensors['hava_nemi'];
        var anliktnem = Sensors['toprak_nemi'];
        var anlikisik = Sensors['isik'];
       
        if(anliksicaklik != 0 && anliknem != 0)  	
            global.Results['pumping_duration'] = havalandirma(anliksicaklik, anliknem);
        
        if(anliknem != 0 && anliktnem != 0) 
            global.Results['servo_angle'] = Sulama(anliknem,anliktnem);
           
        if(anlikisik != 0)
            global.Results['light_amount'] = Isiklandirma(anlikisik);
    }
    
    module.exports.Calculate = Calculate;
}());